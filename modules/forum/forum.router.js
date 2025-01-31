const express = require('express');
const { createPost, allPost, singlePost, newComment, deletePost, deleteComment, editPost, editComment, searchPost } = require('./forum.controller');
const {authenticateToken} = require('../../middleware/auth.middleware');

const router = express.Router();

router.post('/newpost', authenticateToken, createPost);
router.get('/allposts', allPost);
router.get('/post/:id', singlePost);
router.post('/newcomment/:post_id', authenticateToken, newComment);
router.delete('/deletepost/:post_id', authenticateToken, deletePost);
router.delete('/deletecomment/:comment_id', authenticateToken, deleteComment);
router.put('/editpost/:post_id', authenticateToken, editPost);
router.put('/editcomment/:comment_id', authenticateToken, editComment);
router.get('/search/:search', searchPost);

module.exports = router;