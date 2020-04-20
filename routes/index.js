const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const project = require('../models/project');
const post = require('../models/post');
const asset= require('../models/asset');
const member= require('../models/member');
// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, async(req, res) =>{
  // only get projects user created
  const items = await project.find()
  const posts = await post.find()
  const assets = await asset.find()
  const members = await member.find()
  const membership = await member.find({userid: req.user.id})

  res.render('dashboard',{
    items : items,
    user: req.user,
    post : posts,
    asset : assets,
    member: members,
    membership : membership
  
    
  },)
 
}

  
);


module.exports = router;
