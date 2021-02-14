const express= require ('express');
const mongoose=require ('mongoose');
const memeModel =require( './models/memeschema');
const cors=require('cors');
const connectionURL=require('./.env');
const dotenv=require('dotenv');
//const dbURI='';
const connectionURL=process.env.connectionURL||'mongodb://127.0.0.1:27017/memeConainer'
const App= express();
const PORT= process.env.PORT || 8081;
App.use(express.json());
App.use(cors());
dotenv.config();

mongoose.connect(connectionURL,{useNewUrlParser: true,useUnifiedTopology: true,})
    .then(()=>{
     console.log("connection to local mongodb successfull!");
    })

App.get("/",(req,res)=>{
    res.send("Hey!This is the backend server of XMeme");
})
App.get('/memes',async(req,res)=>{
    memeModel.find({},(error,result)=>{
        if(error)
        {
            console.log("Error in getting data from database!");
        }
        else
        {
            res.send(result);
            console.log("Successfully received data from database!");

        }
    }).sort({date:-1}).limit(100);

});

App.post("/memes",async(req,res)=>{
    m_name=req.body.name;
    m_caption=req.body.caption;
    m_url=req.body.url;
   
    const user= new memeModel({
       
       name: m_name,
        caption: m_caption,
       url: m_url});
    await user.save();
    // console.log("{ id: '"+Math.random()*10+"'}");
    // res.send("{ id: '"+Math.random()*10+"'}");
})

App.delete("/delete/:id",async(req,res)=>{
    const id =req.params.id;
    await memeModel.findOneAndRemove(id).exec();

    res.send(id);
});

App.get("/memes/:id",(req,res)=>{
    const id=req.params.id;
    memeModel.findById(id,(error,result)=>{
    if(error)
    {
        res.send(error);
        console.log("Unable to find meme with id: "+id );
    }
    else
    {
        res.send(result);
    }
    })
})


App.put("/memes/:id",async(req,res)=>{
    const new_url=req.body.new_url;
    const new_caption=req.body.new_caption;
    const id=req.body.id;
    const new_name=req.body.new_name;

    
    try{
        await memeModel.findById(id,(error,friendToupdate)=>{
           if(error)
           {
               console.log(error);
        }
        else
    { friendToupdate.caption=new_caption;
        friendToupdate.url=new_url;
        friendToupdate.name=new_name;
        friendToupdate.save();
        res.send(friendToupdate);
}
        });
    }
    catch(error){
console.log(error);
    }
   
           
   
});


App.listen(PORT,()=>{
    console.log("Server is running on port: "+PORT);
})