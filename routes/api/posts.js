const express = require('express');
const router = express.Router();

//Route api/posts/test
//Desc: test the route
//Access: public
router.get('/test', (req,res) => res.json({msg:"Posts works!!"}));

module.exports=router;