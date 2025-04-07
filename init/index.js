const mongoose=require("mongoose");
const initData=require("./data");
const Listing=require("../models/listing.js");


const URL='mongodb://127.0.0.1:27017/Airbnb';

main().then(()=>{
    console.log("DB is connected");
}).catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect(URL);
}

const initDB=async ()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({ ...obj,owner:"67ec172195811ae6253bd261"}));
    await Listing.insertMany(initData.data);
    console.log("data initialized");
}

initDB();