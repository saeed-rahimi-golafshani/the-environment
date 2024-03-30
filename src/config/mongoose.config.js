const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
dotenv.config();

mongoose.connect(process.env.MONGODB_URL).then(() =>{
    console.log("Connected To MongoDb...");
}).catch(err => {
    console.log(err?.message ?? "Feiled Db Connection...");
})