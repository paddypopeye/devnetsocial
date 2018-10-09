const express = require('express');

const router = express.Router();

//Route api/profile/test
//Desc: test the route
//Access: public
router.get('/test', (req,res) => res.json({msg:"Profile works!!"}));

module.exports=router;