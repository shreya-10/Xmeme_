const mongoose= require('mongoose');
const memeschema=new mongoose.Schema({
   
   name: {
       type: String,
       required : true ,
   },
   caption : {
       type: String,
       required : true,
   },
   url : {
    type: String,
    required : true,
},
date: {
    type: Date,
    default: Date.now
},
});
const memeModel=mongoose.model('memes-data',memeschema);
module.exports=memeModel;