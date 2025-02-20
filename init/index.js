const mongoose = require("mongoose");
const initData = require('./data.js');
const Listing = require("../models/listing.js");

main().then(()=>{
  console.log("connected to DB");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
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

initDB();
