const mongoose = require("mongoose");

const DB = process.env.DATABASE

const conn=async()=>{
    try {
        await mongoose.connect(DB)
        console.log("Connected")
    } catch (e) {
        console.log(e)
    }
}

conn()