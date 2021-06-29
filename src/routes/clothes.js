const express = require('express');
const Clothes = require('../models/clothes');
const validator =require('../middlewares/validator');
const router = express.Router();
const clothes = new Clothes();

router.get('/',getClothes);
router.get('/:id',validator,getClothes);
router.post('/',validator,createClothes);
router.put('/:id',validator,updateClothes);
router.delete('/:id',deleteClothes);


function getClothes(req,res){
  const resObj = clothes.read(req.params.id);
  res.json(resObj);
}

function createClothes(req,res){
  const resObj = clothes.create(req.body);
  res.json(resObj);
}

function updateClothes(req,res){
  const resObj = clothes.update(req.params.id,req.body);
  res.json(resObj);
}

function deleteClothes(req,res){
  const resObj = clothes.delete(req.params.id);
  res.json(resObj);
}
module.exports=router;