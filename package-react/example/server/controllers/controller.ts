import fs from 'fs/promises';
import path from 'path';
import { Request, Response, NextFunction } from 'express';

type ControllerType = {
  fetchData: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  createComment: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
  createReply: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
  likeComment: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
  deleteComment: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
  deleteReply: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
};

const controller: ControllerType = {
  fetchData: async (req, res, next) => {
    try {
      const database = req.query.database;

      const data = await fs.readFile(
        path.join(__dirname, `../../models/${database}.json`),
        'utf8'
      );
      const db = JSON.parse(data);

      res.locals.fetchData = db;

      next();
    } catch (err) {
      console.error('Error reading from database.json:', err);
      res.status(500).send('Error reading data');
    }
  },

  createComment: async (req, res, next) => {
    try {
      const { database, newComment } = req.body;

      const dbPath = path.join(__dirname, `../../models/${database}.json`);
      const data = await fs.readFile(dbPath, 'utf8');
      const db = JSON.parse(data);

      db.unshift(newComment);

      await fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8');

      res.locals.createComment = db;

      next();
    } catch (err) {
      console.error('Error updating database.json:', err);
      res.status(500).send('Error saving data');
    }
  },

  createReply: async (req, res, next) => {
    try {
      const { database, commentIndex, reply } = req.body;
      const commentIndexInt = parseInt(commentIndex, 10);

      const dbPath = path.join(__dirname, `../../models/${database}.json`);
      const data = await fs.readFile(dbPath, 'utf8');
      const db = JSON.parse(data);

      db[commentIndexInt].replies.push(reply);

      await fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8');

      res.locals.createReply = db;

      next();
    } catch (err) {
      console.error('Error updating database.json:', err);
      res.status(500).send('Error saving data');
    }
  },

  likeComment: async (req, res, next) => {
    try {
      const { database, commentIndex } = req.body;
      const commentIndexInt = parseInt(commentIndex, 10);

      const dbPath = path.join(__dirname, `../../models/${database}.json`);
      const data = await fs.readFile(dbPath, 'utf8');
      const db = JSON.parse(data);

      db[commentIndexInt].liked = !db[commentIndexInt].liked;

      await fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8');

      res.locals.likeComment = db;

      next();
    } catch (err) {
      console.error('Error liking a comment', err);
      res.status(500).send('Error liking a comment');
    }
  },

  deleteComment: async (req, res, next) => {
    try {
      const { database, commentIndex } = req.body;
      const commentIndexInt = parseInt(commentIndex, 10);

      const dbPath = path.join(__dirname, `../../models/${database}.json`);
      const data = await fs.readFile(dbPath, 'utf8');
      let db = JSON.parse(data);

      const updatedCommentsArray = db.filter((_, curIndex) => {
        return curIndex !== commentIndexInt;
      });

      db = updatedCommentsArray;

      await fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8');

      res.locals.deleteComment = db;

      next();
    } catch (err) {
      console.error('Error updating database.json:', err);
      res.status(500).send('Error saving data');
    }
  },

  deleteReply: async (req, res, next) => {
    try {
      const { database, commentIndex, replyIndex } = req.body;
      const commentIndexInt = parseInt(commentIndex, 10);
      const replyIndexInt = parseInt(replyIndex, 10);

      const dbPath = path.join(__dirname, `../../models/${database}.json`);
      const data = await fs.readFile(dbPath, 'utf8');
      const db = JSON.parse(data);

      const targetComment = db[commentIndexInt];

      if (targetComment && targetComment.replies) {
        const updatedReplies = targetComment.replies.filter(
          (_, curIndex) => curIndex !== replyIndexInt
        );
        targetComment.replies = updatedReplies;
      }

      await fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8');

      res.locals.deleteReply = db;

      next();
    } catch (err) {
      console.error('Error updating database.json:', err);
      res.status(500).send('Error saving data');
    }
  },
};

export default controller;
