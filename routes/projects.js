const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const session = require('express-session');
// Load User model
const project = require('../models/project');
const ppost = require('../models/post');
const passet = require('../models/asset');
const pmember = require('../models/member');
const { forwardAuthenticated } = require('../config/auth');


//   create project

router.post('/create',async (req,res)=>{
    const projectdata = new project({
        name: req.body.title,
        description: req.body.description,
        status: req.body.status,
        type: req.body.type,
        usercreatorid: req.user._id
    })
    try
    {
       projectdata = await projectdata.save()
       res.redirect('/dashboard')
    }catch (e){
        console.log(e)
        res.redirect('/dashboard')
    }
    
})


//delete project
router.post('/yourprojects/delete/:id', async (req, res) => {
    await project.findByIdAndDelete(req.params.id)
    await ppost.deleteMany({projectid : req.params.id})
    await passet.deleteMany({projectid : req.params.id})
    res.redirect('/dashboard')
  })
  

// get edit project page
  router.get('/yourprojects/edit/:id', async (req, res) => {
    const values = await project.findById(req.params.id)
    res.render('./edit/editprojects', { values: values })
  })

  //post from edit project page
  router.post('/edit/:id', async (req, res) => {
   await project.findOneAndUpdate({_id:req.params.id},{
       $set:{
        name: req.body.title,
        description: req.body.description,
        status: req.body.status,
        type: req.body.type,
        usercreatorid: req.user._id
       }
   })
        try
         {
            res.redirect('/dashboard')
         }catch (e){
             console.log(e)
             res.redirect('/dashboard')
         }
    
  })


//add post
router.post('/yourprojects/addpost/:id',async (req,res)=>{
    const postdata = new ppost({
        title: req.body.posttitle,
        content: req.body.postdescription,
        userid: req.user._id,
        projectid: req.params.id
    })
    try
    {
       postdata = await postdata.save()
       res.redirect('/dashboard')
    }catch (e){
        console.log(e)
        res.redirect('/dashboard')
    }
    
})


//delete post
router.post('/yourprojects/deletepost/:id', async (req, res) => {
    await ppost.findByIdAndDelete(req.params.id)
    res.redirect('/dashboard')
  })
  
// get edit post page
router.get('/posts/edit/:id', async (req, res) => {
    const values = await ppost.findById(req.params.id)
    res.render('./edit/editposts', { values: values })
  })


  //post from edit post page
  router.post('/posts/edit/:id', async (req, res) => {
    await ppost.findOneAndUpdate({_id:req.params.id},{
        $set:{
            title: req.body.posttitle,
            content: req.body.postdescription
        }
    })
         try
          {
             res.redirect('/dashboard')
          }catch (e){
              console.log(e)
              res.redirect('/dashboard')
          }
     
     
   })
 



//add asset
router.post('/yourprojects/addasset/:id',async (req,res)=>{
    const postasset = new passet({
        name: req.body.assetname,
        description: req.body.assetdescription,
        userid: req.user._id,
        projectid: req.params.id,
        link: req.body.assetlink
    })
    try
    {
       postasset = await postasset.save()
       res.redirect('/dashboard')
    }catch (e){
        console.log(e)
        res.redirect('/dashboard')
    }
    
})


//delete asset
router.post('/yourprojects/deleteasset/:id', async (req, res) => {
    await passet.findByIdAndDelete(req.params.id)
    res.redirect('/dashboard')
  })
  
// get edit asset page
router.get('/assets/edit/:id', async (req, res) => {
    const values = await passet.findById(req.params.id)
    res.render('./edit/editassets', { values: values })
  })


  //post from edit asset page
  router.post('/assets/edit/:id', async (req, res) => {
    await passet.findOneAndUpdate({_id:req.params.id},{
        $set:{
            name: req.body.assetname,
            description: req.body.assetdescription,
            link: req.body.assetlink
        }
    })
         try
          {
             res.redirect('/dashboard')
          }catch (e){
              console.log(e)
              res.redirect('/dashboard')
          }
     
     
   })



//    join project as member
router.post('/join',async (req,res)=>{

    const newmember = new pmember({
        userid: req.user._id,
        projectid: req.body.joinprojectid,
        name: req.user.name
    })
    try
    {
       newmember = await newmember.save()
       res.redirect('/dashboard')
    }catch (e){
        console.log(e)
        res.redirect('/dashboard')
    }
    
})


//delete member from project
router.post('/member/delete/:id',async (req,res)=>{
    await pmember.findByIdAndDelete(req.params.id)
    res.redirect('/dashboard')
    
})

//approve member

router.post('/member/approve/:id',async (req,res)=>{
    await pmember.findByIdAndUpdate(req.params.id,{
        $set:{
            approve: 'approved'
        }
    })
    res.redirect('/dashboard')
    
})

//add member role

router.post('/member/role/:id',async (req,res)=>{
    await pmember.findByIdAndUpdate(req.params.id,{
        $set:{
            role: req.body.memberrole
        }
    })
    res.redirect('/dashboard')
    
})
// remove member role
router.post('/member/role/delete/:id',async (req,res)=>{
    await pmember.findByIdAndUpdate(req.params.id,{
        $set:{
            role: null
        }
    })
    res.redirect('/dashboard')
    
})





module.exports = router;
