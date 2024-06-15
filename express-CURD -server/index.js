const express=require("express")
const cors=require("cors")
const app=express();
const { MongoClient, ServerApiVersion } = require('mongodb');

const port = process.env.PORT || 3000;

//mibiplob01 username
//rHynVm5O5PTzKFh2 password
//middleware
app.use(cors());
app.use(express.json());




const uri = "mongodb+srv://mibiplob01:rHynVm5O5PTzKFh2@cluster0.ij6ptye.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    const users = client.db("userDB").collection("users");

    app.post("/users",async(req,res)=>{
      const user=req.body;
      console.log(user)
      const result = await users.insertOne(user);
      res.send(result)
    })
    
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
    // await client.close();
  }
}
run().catch(console.dir);




app.get("/",(req,res)=>{
    res.send(`Server is running`)
})

app.listen(port,()=>{
    console.log(`server is running on port no ${port}`)
})