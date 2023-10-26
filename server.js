import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
const PORT = process.env.PORT | 5000
const server = express()
// Establish connection to the mongoDB Atlas database 
mongoose.connect("mongodb+srv://root:root@cluster0.lxonsov.mongodb.net/internDB?retryWrites=true&w=majority&appName=AtlasApp").then(() => console.log('Connected to the database'))

const mySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    img: String,
    summary: String
}, { timestamps: true })

const model = mongoose.model("Movie", mySchema)

const createNewData = async ( moviename,movieImg,movieSummary) => {
    await model.create({
        name: moviename,
        img: movieImg,
        summary: movieSummary
    })
}

const readData = async()=>{
   const data = await model.find({})
   console.log(data)
}

const updateData = async(name,summary)=>{
    await model.updateOne({
        name:name,
        summary:summary
    })
}

const deleteData =async(name)=>{
    await model.deleteOne({
        name:name
    })

}

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

server.set('view engine', "ejs")


server.get('/', (req, res) => {
    res.render('index')


})

server.get('/alldata',(req,res)=>{
   const alldata = readData()
//    alldata.forEach(element => {
//     res.send(element)
//    });
console.log(typeof(alldata))
})
server.post('/data', (req, res) => {
    const { name, img, summary} = req.body
    // createNewData( name, img, summary)
    // deleteData(name)
    // updateData(name,summary)
    res.redirect('/')

})

server.listen(PORT, (() => console.log(`Server is listening at http://localhost:${PORT}`))) 