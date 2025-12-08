const mongoose = require("mongoose");
const { isLowercase } = require("validator");
const shelterSchema= new mongoose.Schema(

{
  name: {type:String, required:true},
  emailId: {type:String, required:true,unique:true,lowercase:true},
  phone: {type:String, required:true},
  address: {
    city: {type:String,required:true,},
    state: {type:String,required:true,},
    pincode: {type:String,required:true,
    match: [/^[0-9]{6}$/, "Pincode must be 6 digits"]},
    fullAddress:{type:String,required:true,},
  },
  verified:{type:Boolean,default:false},
  adminsUserId:[{ type: mongoose.Schema.Types.ObjectId,
    ref: 'User' }],
  documents:{type:[String],default:[]},
},{timestamps:true}

)

const Shelter= mongoose.model("shelter", shelterSchema)

module.exports=Shelter;