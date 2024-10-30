// import mongoose from "mongoose";


// const userschema = new mongoose.Schema({
//     name:{type: String},
//     email:{type:String},
//     password:{type:String}
    
// })

// export default mongoose.model.user||mongoose.model('user',userschema)

import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    pic: { type: String } ,
    name: { type: String },
    email: { type: String,   },
    phone: { type: Number,  }, 
    password: { type: String, }
    
})

export default mongoose.model('user', userschema);