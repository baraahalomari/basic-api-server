'use strict';
module.exports=(req,res,next)=>{
  if (req.body ){
    next();
  }else{
    next('Invalid request data');
  }
};