const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const validatePostInput = require('../../validation/post');

//Route GET api/posts
//Desc: Get all posts
//Access: public
router.get('/', (req,res) => {
    Post.find()
    .sort({date: -1})
    .then(posts =>{
        res.json(posts)
    }).catch(err =>{
        res.status(404).json(err)
    })//end then
});//end get()

//Route GET api/posts/:id
//Desc: Get single post by id 
//Access: public 
router.get('/:id', (req,res) => {
    Post.findById(req.params.id)
    .then(post =>{ 
        res.json(post)
    })
    .catch(err =>{
         res.status(404).json({message:'No post with given id'})
    })//end catch
});//end get()


//Route DELETE api/posts/:id
//Desc: Delete a single post by its id 
//Access: private 
router.delete('/:id', passport.authenticate('jwt',{session:false}), (req,res) => {
    Profile.findOne({user:req.user.id})
    .then(profile =>{
        Post.findById(req.params.id).then(post => {
            //check post owner
            if(post.user.toString() !== req.user.id){
                return res.status(401).json({error: 'User not authorized'})
            }//end if
            
            post.remove().then(() => res.json({success: true}));
        })//end then
            .catch(err => {res.status(404).json({deletePost:'No post found'})})//end  
        res .json(profile)
    })
    .catch(err =>{
         res.status(404).json({message:'Failed to delete post with given id'})
    })//end catch
});//end get()  

//Route GET api/posts/test
//Desc: Test the route
//Access: public
router.get('/test', (req,res)  => res.json({msg:"Posts works!!"}));

//Route POST api/posts
//Desc: Post new posts
//Access: private
router.post('/', passport.authenticate('jwt',{session:false}), (req,res) =>{
    const {errors, isValid} = validatePostInput(req.body);
    if(!isValid){
        //if errors
        return res.status(400).json(errors)
    }//end if 
    const newPost = new Post({
         text: req.body.text,
         name: req.body.name,
         avatar: req.body.avatar,
         user: req.user.id
    });//end newPost
    newPost.save().then(post => res.json(post)).catch(err => res.json(err));
});//end post

router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => likes.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: 'User already liked this post' });
          }

          // Add user id to likes array
          post.likes.unshift({ user: req.user.id });

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ alreadyLiked: 'You already liked this post' }));
    });
  }
);


//Route POST api/posts/unlike/:id
//Desc: Post a unlike to a single post by its id 
//Access: private
router.post('/unlike/:id',passport.authenticate('jwt', {session:false}),(req,res) => {
    Profile.findOne({ user:req.user.id })
    .then(profile =>{
        Post.findById(req.params.id).then(post => {
            if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
                return res.status(400).json({notliked: 'You have not liked this post'})
            }//end if
            //Add user to likes
            const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id)
            //post.likes.unshift({ user: req.user.id});
            post.likes.splice(removeIndex, 1);
            post.save().then(post => res.json(post))
        })
        .catch(err => {res.status(404).json({postnotfound:'No post found'})})//end  
    })//end then(profile)
});//end get()

//Route POST api/posts/comment/:id
//Desc: Add a comment to a post
//Access: public
router.post('/comment/:id', passport.authenticate('jwt', {session:false}), (req,res) =>{
    //Validation of input
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid){ 
        return res.status(400).json(errors)
    }
    Post.findById(req.params.id).then(post => {
        const newComment = {
            name: req.body.name,
            text: req.body.text,
            avatar: req.body.avatar,
            user: req.user.id
        }//end newComment

        post.comments.unshift(newComment);

        post.save().then(post => res.json(post));
    }).catch(err =>  res.status(404).json({addComment: "Error adding comment"}));//end catch()
})//end post('/comment/:id')

//Route Delete api/comment/:id/comment_id
//Desc:  Delete a comment by its id 
//Access: private
router.delete('/comment/:id/:comment_id',passport.authenticate('jwt', {session:false}),(req,res) => {
    Profile.findOne({ user:req.user.id })
    .then(profile =>{
        Post.findById(req.params.id).then(post => {
            if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0){
          return res.status(404).json({ commentnotexists: 'Comment does not exist' });
        }//end if
            //Add user to comments
            const removeIndex = post.comments
            .map(item => item._id.toString())
            .indexOf(req.params.comment_id)
            //post.likes.unshift({ user: req.user.id});
            post.comments.splice(removeIndex, 1);
            post.save().then(post => res.json(post))
        })
        .catch(err => {res.status(404).json({commentnotfound:'No comment found'})})//end  
    })//end then(profile)
});//end get()
module.exports=router;