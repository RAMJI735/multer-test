const mongoose= require("mongoose");
const express= require("express");
const multer = require("multer");
const app= express();
const path= require("path");
const ejs= require("ejs");
const Image= require("./model/image")


const mongodb=async()=>{
await mongoose.connect("mongodb+srv://dipanshusrivastava735:deepanshu123@cluster0.j0x2swe.mongodb.net/multer-test");
console.log("db connected");
}

mongodb()
const storage= multer.diskStorage({
    destination: function(req,res,cb){
        cb(null,'public/')
    },
  
    filename: function(req,file,cb){
        let ext= path.extname(file.originalname);
        cb(null, file.fieldname+ Date.now()+ ext);
    }
})

const upload= multer({storage: storage})


app.use(express.urlencoded({extended: true}))
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));


app.use(express.static(path.join(__dirname, 'public')));


app.get("/",(req,res)=>{
    res.render("home.ejs");
});

app.post("/post",upload.single('image'),async(req,res)=>{
    // console.log(req.file);
    const image=req.file.filename;
    console.log(image);
    let uploadimage= await Image.create({image:image});
    await uploadimage.save();
    console.log(uploadimage)
})

app.get("/show",async(req,res)=>{
    let showimage= await Image.find({});
    res.send({showimage});
})

app.listen(8080,(req,res)=>{
    console.log("server started 8080");

})