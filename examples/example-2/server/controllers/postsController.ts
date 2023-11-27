import fs from 'fs/promises';
import path from 'path';
import { Request, Response, NextFunction } from 'express';

type PostsController = {
  fetchData: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  createPost: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
  likePost: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  deletePost: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
  createComment: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
  openComment: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
};

const postsController: PostsController = {
  fetchData: async (req, res, next) => {
    try {
      const data = await fs.readFile(
        path.join(__dirname, '../../models/database.json'),
        'utf8'
      );
      const db = JSON.parse(data);

      res.locals.fetchData = db.posts;

      next();
    } catch (err) {
      console.error('Error reading from database.json:', err);
      res.status(500).send('Error reading data');
    }
  },

  createPost: async (req, res, next) => {
    try {
      const dbPath = path.join(__dirname, '../../models/database.json');
      const data = await fs.readFile(dbPath, 'utf8');
      const db = JSON.parse(data);

      const newPost = req.body;
      db.posts.unshift(newPost);

      await fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8');

      res.locals.createPost = db.posts;

      next();
    } catch (err) {
      console.error('Error updating database.json:', err);
      res.status(500).send('Error saving data');
    }
  },

  likePost: async (req, res, next) => {
    try {
      const dbPath = path.join(__dirname, '../../models/database.json');
      const data = await fs.readFile(dbPath, 'utf8');
      const db = JSON.parse(data);

      const index = parseInt(req.body.index, 10);

      db.posts[index].liked = !db.posts[index].liked;

      await fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8');

      res.locals.likePost = db.posts;

      next();
    } catch (err) {
      console.error('Error updating database.json:', err);
      res.status(500).send('Error saving data');
    }
  },

  deletePost: async (req, res, next) => {
    try {
      const dbPath = path.join(__dirname, '../../models/database.json');
      const data = await fs.readFile(dbPath, 'utf8');
      const db = JSON.parse(data);

      const index = parseInt(req.body.index, 10);

      const updatedPostsArray = db.posts.filter((_, curIndex) => {
        return curIndex !== index;
      });

      db.posts = updatedPostsArray;

      await fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8');

      res.locals.deletePost = db.posts;

      next();
    } catch (err) {
      console.error('Error updating database.json:', err);
      res.status(500).send('Error saving data');
    }
  },

  createComment: async (req, res, next) => {
    try {
      const dbPath = path.join(__dirname, '../../models/database.json');
      const data = await fs.readFile(dbPath, 'utf8');
      const db = JSON.parse(data);

      const { index, comment } = req.body;
      const postIndex = parseInt(index, 10);

      db.posts[postIndex].comments.push(comment);

      await fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8');

      res.locals.createComment = db.posts;

      next();
    } catch (err) {
      console.error('Error updating database.json:', err);
      res.status(500).send('Error saving data');
    }
  },

  openComment: async (req, res, next) => {
    try {
      const dbPath = path.join(__dirname, '../../models/database.json');
      const data = await fs.readFile(dbPath, 'utf8');
      const db = JSON.parse(data);

      const index = parseInt(req.body.index, 10);

      db.posts[index].createComment = !db.posts[index].createComment;

      await fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8');

      res.locals.openComment = db.posts;

      next();
    } catch (err) {
      console.error('Error updating database.json:', err);
      res.status(500).send('Error saving data');
    }
  },
};

export default postsController;
