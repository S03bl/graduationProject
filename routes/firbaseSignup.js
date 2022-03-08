const {auth,createUserWithEmailAndPassword}=require('./firbase')
const User = require("../models/User");
const bcrypt = require("bcrypt");

async function createUser(username,email,password,userId,res){
    try{
        //create a new password
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password, salt);
       //create new user 
       const newUser = new User({
       username: username,
       email: email,
       password: hashedPassword,
       uid:userId
       });
       
       //save user and respond 
       const user = await newUser.save();
       res.status(200).send(user);
    }
      
    catch(err){
        res.status(500).send("error from mongoose"+err)
    }
}

function register(username,email,password,res){

    createUserWithEmailAndPassword(auth, email, password)
    .then((Gres) => {
        const user=Gres.user
        const userId=user.uid
        //console.log(user)
        //console.log("UserId=>"+userId)
        return createUser(username,email,password,userId,res) 
    })
    .catch((error) => {
    return res.status(500).send(error)
    });
}
module.exports={register,createUser}