const { getAuth, sendPasswordResetEmail }=require("firebase/auth");
const auth = getAuth();


function restPassword(email,res){
sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!
    res.status(200).send("rest password Email is sent")

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    res.status(500).send(error)
  });

}

module.exports={restPassword}



