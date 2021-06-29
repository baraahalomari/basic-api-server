const express = require('express');
const Food = require('../models/food');
const validator =require('../middlewares/validator');
const router = express.Router();
const food = new Food();

router.get('/',getFood);
router.get('/:id',validator,getFood);
router.post('/',validator,createFood);
router.put('/:id',validator,updateFood);
router.delete('/:id',deleteFood);


function getFood(req,res){
  const resObj = food.read(req.params.id);
  res.json(resObj);
}

function createFood(req,res){
  let foodObj = req.body;
  const resObj = food.create(foodObj);
  res.json(resObj);
}

function updateFood(req,res){
  const resObj = food.update(req.params.id,req.body);
  res.json(resObj);
}

function deleteFood(req,res){
  const resObj = food.delete(req.params.id);
  res.json(resObj);
}
module.exports=router;