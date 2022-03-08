// TODO: Add SDKs for Firebase products that you want to use
//https://firebase.google.com/docs/web/setup#available-libraries

const { initializeApp } =require ("firebase/app");

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKCGgiRinVXoDfOtHGf_LQ6-zge2reN_U",
  authDomain: "graduationproject-defb2.firebaseapp.com",
  projectId: "graduationproject-defb2",
  storageBucket: "graduationproject-defb2.appspot.com",
  messagingSenderId: "354079041168",
  appId: "1:354079041168:web:261552958ebb92c5311a15",
  measurementId: "G-VH4E7TW6JF"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword  } =require("firebase/auth");

const auth = getAuth(firebaseApp );

module.exports={auth,createUserWithEmailAndPassword,signInWithEmailAndPassword }


/* -------------------------------------------------------------------------- */
/*                                    hint                                    */
/* -------------------------------------------------------------------------- */
/* const we=createUserWithEmailAndPassword(auth, email, pass)
console.log(we.then(userCredential=>console.log(userCredential.user.email)).catch(err=>console.log("Error=>"+err)))
   .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    console.log(errorCode )
    console.log(errorMessage)
    // ..
  }); */

