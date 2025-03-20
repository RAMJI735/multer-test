const mongoose= require("mongoose");

const imageschema= new mongoose.Schema({
    image: String,
});

const Image= mongoose.model("Image",imageschema)

module.exports= Image;