const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
            name:{
                type:String,
                required:[true,"Name is required"],
                trim:true
            },
            price:{
                type:Number,
                required:[true,"Price is required"]
            }  ,
            quantity:{
                type:Number,
                required:[true,"Price is required"]
            },
            supplier_name: {
                type: String,
                trim: true 
            }

},{timestamps:true})


// 

const model = mongoose.model("item",Schema)
module.exports= model