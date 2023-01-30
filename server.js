const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({path: './config/config.env'})

mongoose.set("strictQuery", false)
const Db = process.env.DATABASE;

mongoose.connect(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log(`MongoDb connected successfully`);
})

port = process.env.PORT
app.listen(port, ()=>{
    console.log(`Listening to port ${port}`)
});