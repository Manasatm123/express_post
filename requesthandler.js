import postSchema from './models/post.model.js'
import userschema from './models/user.model.js'
import bcrypt from 'bcrypt'
import pkg from 'jsonwebtoken'
const {sign} = pkg


export async function adduser(req,res) {
    // console.log(req.body);
    const {pic,name,email,phone,password,confirmpassword}=req.body
    if(!(name&&email&&phone&&password&&confirmpassword))
        return res.status(400).send({msg:"invalid input"})
    else if(password!=confirmpassword)
        return res.status(400).send({msg:"password missmatch"})

    bcrypt.hash(password,10).then((hpwd)=>{
        console.log(hpwd)
        console.log("data added");
        userschema.create({pic,name,email,phone,password:hpwd}).then(()=>{
            res.status(201).send({msg:"Successfull"})
        }).catch((error)=>{
            res.status(404).send({error:error})
        }) 
        
    }).catch((error)=>{
        console.log(error)
        
    })
    
}

 
export async function login(req,res) {
    // console.log(req.body);
    const {email,password}=req.body;

    if (!(email&&password))
        return res.status(500).send({msg:"feilds are empty"})
    const user= await userschema.findOne({email})

    if (!user) 
        return res.status(500).send({msg:"user not exits"})
    console.log(user.password);
    
    const success = await bcrypt.compare(password,user.password)
    console.log(success);
    if (success !==true)
        return res.status(500).send({msg: "user or password not exits"})
    const token = await sign({UserID:user._id},process.env.JWT_KEY,{expiresIn:"24h"})
    res.status(200).send({token})
     
}

// export async function getUser(req, res) {
//     // console.log("==================================");

//     console.log(req.user);

//     const usr=await userschema.findOne({_id:req.user.UserID})
//     // console.log(usr);

//     console.log("get user");
//     res.status(200).send({usr,data}); 
// }

export async function getUser(req, res) {
    const usr=await userschema.findOne({_id:req.user.UserID})
    // console.log(usr);
    const data=await postSchema.find()
    // console.log(data);
    res.status(200).send({usr,data}); 
}


// export async function getuserdata(req,res) {
//     const usr=await userschema.findOne({_id:req.user.UserID})
//     res.status(200).send({pic:usr.pic,user:usr.name,email:usr.email,phone:usr.phone})
    
// }

export async function getuserdata(req,res) {
    const usr=await userschema.findOne({_id:req.user.UserID})
    const post=await postSchema.find({id:req.user.UserID})
    res.status(200).send({usr,post}); 
}




export async function addPost(req,res) {
    // console.log(req.user.UserID);
    
    // console.log(req.body);
    
    const{pics,caption,description}=req.body
    await postSchema.create({id:req.user.UserID,pics:pics,caption:caption,description:description})
    
}


export async function showPost(req,res) {
    // console.log(req.params.id);
    const id=req.params.id
    const post=await postSchema.findOne({_id:id})
    // console.log(post);
    res.status(200).send({post})
}


export async function update(req,res) {
    // console.log(req.user.UserID);
    // console.log(req.body);
    const {...data}=req.body
    await postSchema.updateOne({_id:req.params.id},{$set:{id:req.user.UserID,...data}}).then(()=>{
        res.status(201).send({msg:"updated"})
    }).catch((error)=>{
        res.status(500).send({error:error})  
    })  
}


export async function deleteUser(req, res) {
    // console.log(req.params); 
    const { id } = req.params;  
    const data = await userschema.deleteOne({ _id: id })
        .then(() => {
            res.status(201).send({ msg: "Deleted" });
        })
        .catch((error) => {
            res.status(500).send({ error });
        });
}


export async function deletepost(req, res) {
    // console.log("========delete==================");
    
    console.log(req.params.id); 
    // console.log("========delete=========delete=========");

    const id = req.params.id;  
     await postSchema.deleteOne({_id:id })
        .then(() => {
            console.log("deleted");
            
            res.status(201).send({ msg: "Deleted" });
        })
        .catch((error) => {
            res.status(500).send({ error });
        });
}