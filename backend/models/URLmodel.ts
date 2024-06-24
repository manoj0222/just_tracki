import mongoose, { Mongoose } from "mongoose";


export const URLSchema = new mongoose.Schema({
    originalurl:{
        type:String,
        required:true
    },
    createdate:{
        type:Date,
        default:new Date().toISOString()
    },
    short_url:{
        type:String,
    },
    custom_url:{
        type:String,
        unique:true
    },
    user_id:{
        type:String,
        required:true
    },
    title:{
        type:String,
    },
    qrcode:{
        type:String,
    }
    
})

export const URL = mongoose.model('URLSchema', URLSchema);
