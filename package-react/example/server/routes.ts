import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import controller from './controllers/controller';

const router = express.Router();

router.get('/fetch-data', controller.fetchData, async (req, res) => {
  res.status(200).json(res.locals.fetchData);
});

router.post('/create-comment', controller.createComment, async (req, res) => {
  res.status(201).json(res.locals.createComment);
});

router.post('/like-comment', controller.likeComment, async (req, res) => {
  res.status(201).json(res.locals.likeComment);
});

router.post('/delete-comment', controller.deleteComment, async (req, res) => {
  res.status(201).json(res.locals.deleteComment);
});

router.post('/delete-reply', controller.deleteReply, async (req, res) => {
  res.status(201).json(res.locals.deleteReply);
});

router.post('/create-reply', controller.createReply, async (req, res) => {
  res.status(201).json(res.locals.createReply);
});

export default router;
