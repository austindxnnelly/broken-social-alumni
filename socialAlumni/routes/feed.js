const express = require('express');
const { req } = require('express');
const PostDB = require('../models/post_schema');
const UserDB = require('../models/user');

const router = express.Router();

router.get('/feed', (req, res) => {
    res.render('feed', {isAuthenticated: true, title: "Timeline"});
  });