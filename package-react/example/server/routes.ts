import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import commentsController from './controllers/commentsController';

const router = express.Router();

router.get('/fetch-data', commentsController.fetchData, async (req, res) => {
  res.status(200).json(res.locals.fetchData);
});

router.post(
  '/create-comment',
  commentsController.createComment,
  async (req, res) => {
    res.status(201).json(res.locals.createComment);
  }
);

router.post(
  '/like-comment',
  commentsController.likeComment,
  async (req, res) => {
    res.status(201).json(res.locals.likeComment);
  }
);

router.post(
  '/delete-comment',
  commentsController.deleteComment,
  async (req, res) => {
    res.status(201).json(res.locals.deleteComment);
  }
);

router.post(
  '/delete-reply',
  commentsController.deleteReply,
  async (req, res) => {
    res.status(201).json(res.locals.deleteReply);
  }
);

router.post(
  '/create-reply',
  commentsController.createReply,
  async (req, res) => {
    res.status(201).json(res.locals.createReply);
  }
);

// open comment
// router.post('/open-comment', postsController.openComment, async (req, res) => {
//   res.status(201).json(res.locals.openComment);
// });

export default router;
