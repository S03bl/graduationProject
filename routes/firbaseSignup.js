const {auth,createUserWithEmailAndPassword}=require('./firbase')
const User = require("../models/User");
const bcrypt = require("bcrypt");

async function createUser(username,email,password,res){
    try{
        //create a new password
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password, salt);
       //create new user 
       const newUser = new User({
       username: username,
       email: email,
       password: hashedPassword,
       });
       
       //save user and respond 
       const user = await newUser.save();
       return res.status(200).send(user);
    }
      
    catch(err){
        return res.status(500).send(err)
    }
}

function register(username,email,password,res){

    createUserWithEmailAndPassword(auth, email, password)
    .then((Gres) => {
       /*  const user = Gres.user;
        console.log(user.uid) */
        return createUser(username,email,password,res) 
    })
    .catch((error) => {
    return res.status(500).send(error)
    });
}
module.exports={register}