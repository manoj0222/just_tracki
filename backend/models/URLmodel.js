const mongoose = require("mongoose");


 const URLSchema = new mongoose.Schema({
    originalurl:{
        type:String,
        required:true
    },
    createdate:{
        type:Date,
        default:new Date().toISOString()
    },
    custom_url:{
        type:String,
        unique:true
    },
    user_id: {
        type: String,
        required: true
    },
    title:{
        type:String,
    },
    qrcode:{
        type:String,
    }
    
})

const URL = mongoose.model('URLSchema', URLSchema);


module.exports=URL;