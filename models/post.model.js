import mongoose from "mongoose";

const posttSchema = new mongoose.Schema({

    id:{type:String},
    pics: { type: Array },
    caption:{type:String},
    description:{type:String} 
});



export default mongoose.model.post||mongoose.model('post',posttSchema) 






