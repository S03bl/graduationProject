const mongoose=require('mongoose')
//const Schema=mongoose.Schema


/* -------------------------------------------------------------------------- */
/*                        create a mongoose connection                        */
/* -------------------------------------------------------------------------- */

const connectToDb=mongoose.connect('mongodb://localhost:27017/Graduation-project-socialMedia',{ useNewUrlParser: true,useUnifiedTopology: true })
.then(()=>console.log(`connect to db`))
.catch((err)=>console.log(`${err}`))

module.exports ={connectToDb}


