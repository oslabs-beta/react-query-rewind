import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import postsController from './controllers/postsController';

const router = express.Router();

// fetching starting data
router.get('/fetch-data', postsController.fetchData, async (req, res) => {
  res.status(200).json(res.locals.fetchData);
});

// create post
router.post('/create-post', postsController.createPost, async (req, res) => {
  res.status(201).json(res.locals.createPost);
});

// like post
router.post('/like-post', postsController.likePost, async (req, res) => {
  res.status(201).json(res.locals.likePost);
});

// delete post
router.post('/delete-post', postsController.deletePost, async (req, res) => {
  res.status(201).json(res.locals.deletePost);
});

// delete reply
router.post('/delete-reply', postsController.deleteReply, async (req, res) => {
  res.status(201).json(res.locals.deletePost);
});

// create commment
router.post(
  '/create-comment',
  postsController.createComment,
  async (req, res) => {
    res.status(201).json(res.locals.createComment);
  }
);

// open comment
router.post('/open-comment', postsController.openComment, async (req, res) => {
  res.status(201).json(res.locals.openComment);
});

export default router;
