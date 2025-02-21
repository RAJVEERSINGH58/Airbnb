const mongoose = require("mongoose");
const initData = require('./data.js');
const Listing = require("../models/listing.js");

main().then(()=>{
  console.log("connected to DB");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://pheonixrajveer:Raj%408181@cluster0.4egvl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
}

const initDB = async () => {
  try {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) =>({...obj , owner: '67aa529d124cf98d09090b6d'}));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
  } catch (err) {
    console.error("Error initializing data:", err);
  }
};

const deleteData = async () => {
   try {
    await mongoose.connect('mongodb+srv://pheonixrajveer:Raj%408181@cluster0.4egvl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log("connected");
    await Listing.deleteMany({});
    
   } catch (error) {
    console.log(error)
   }
}

deleteData();
