const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env" });
const express = require("express");
const mongoose = require('mongoose');
const bp = require("body-parser");
const app = express();
app.set("view engine", "ejs");
app.use(bp.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    //useCreateIndex: true,
    useNewUrlParser: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});


const Schema = mongoose.Schema;
const userSchema = Schema({
    userid : {type: Number, default:null},
    email: {type: String, default:null},
    phone: {type: String, default:null},
    name:{type:String,default:null},
    college: {type: String, default:null},
    status:{type:Number,default:false},
    workshopstatus:{type:Number,default:0},
    password: {type: String,default:null},
    dept:{type:String,default:null},
    year:{type:Number,default:null},
    txnid:{type:String,default:null}
  
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    },
    
});
const User = mongoose.model("Event_db", userSchema);


const wSchema = new Schema({
  userid : {type: Number, default:null},
  email: {type: String, default:null},
  phone: {type: String, default:null},
  name:{type:String,default:null},
  tickets:{type:Number,default:0},
  status:{type:String,default:false},
  txnid:{type:[String],default:[]}

}, {
  timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
  },
  
});

const ml = mongoose.model('ML_db', wSchema);
const ui = mongoose.model('UI_db', wSchema);
const cloud = mongoose.model('cloud_db', wSchema);
const block = mongoose.model('blockchain_db', wSchema);
const ethical = mongoose.model('ethical_db', wSchema);

app.use(express.static(__dirname+'/public'))
app.get('/', (req, res) => {
    res.render("home");
  });


  app.post("/details", (req, res) => {
    //console.log("Details working");
    let det;
    var id = req.body.uid;
    User.find({ userid:parseInt(id)}, function (err, docs) {
      if (err){
          console.log(err);
      }
      else{
          det = docs;
          //console.log(docs);
      }
      res.render("details", { user: det});
      
    });
  
    
    //console.log(temp);
    //res.render("details", { user: det, machine: m[0].status, bchain: b[0].status, uix: u[0].status, hack: e[0].status, aws: c[0].status});
  });
  
  
  app.post("/ml", (req, res) => {
    var id = req.body.uid;
    ml.find({ userid:parseInt(id)}, function (err, docs) {
      console.log("check");
      if (docs.length == 0)
      {
      console.log("no");
      res.render("no");
      }
      else
      {
        console.log("yes");
        res.render("yes");
      }
  
  });
  });
  
  app.post("/ui", (req, res) => {
    var id = req.body.uid;
    ui.find({ userid:parseInt(id)}, function (err, docs) {
      if (docs.length == 0)
      {
      console.log("no");
      res.render("no");
      }
      else
      {
        console.log("yes");
        res.render("yes");
      }
  });
  });
  
  app.post("/cloud", (req, res) => {
    var id = req.body.uid;
    cloud.find({ userid:parseInt(id)}, function (err, docs) {
      if (docs.length == 0)
      {
      console.log("no");
      res.render("no");
      }
      else
      {
        console.log("yes");
        res.render("yes");
      }
  });
  });
  
  app.post("/ethical", (req, res) => {
    var id = req.body.uid;
    ethical.find({ userid:parseInt(id)}, function (err, docs) {
      if (docs.length == 0)
      {
      console.log("no");
      res.render("no");
      }
      else
      {
        console.log("yes");
        res.render("yes");
      }
  });
  });
  
  app.post("/block", (req, res) => {
    var id = req.body.uid;
    block.find({ userid:parseInt(id)}, function (err, docs) {
      if (docs.length == 0)
      {
      console.log("no");
      res.render("no");
      }
      else
      {
        console.log("yes");
        res.render("yes");
      }
  });
  });
  
  app.listen(process.env.PORT || 3000, function () {
    console.log("server has been started successfully");
  });