const mongoose = require("mongoose");
const { isLowercase } = require("validator");
const shelterSchema= new mongoose.Schema(

{
  ownerId: {
        type: mongoose.Schema.Types.ObjectId,ref: "user",required: true},
  name: {type:String, required:true, minlength:2,maxlength:50,trim:true},
  emailId: {type:String, required:true,unique:true,lowercase:true,trim:true},
  phone: {type:String, required:true,match: [/^[0-9]{10}$/, "Phone number must be 10 digits"]},
  address: {
    city: {type:String,required:true,minlength:2,maxlength:50,trim:true},
    state: {type:String,required:true,minlength:2,maxlength:50,trim:true},
    pincode: {type:String,required:true,
    match: [/^[0-9]{6}$/, "Pincode must be 6 digits"]},
    fullAddress:{type:String,required:true,minlength:2,maxlength:500,trim:true},
  },
  verified:{type:Boolean,default:false},
  adminsUserId:[{ type: mongoose.Schema.Types.ObjectId,
    ref: 'user' }],
  documents:{type:[String],default:[],validate:{
        validator: (arr) => arr.length <= 10,
        message: "Maximum 10 Document allowed",
      },},
},{timestamps:true}

)

const Shelter= mongoose.model("shelter", shelterSchema)

module.exports=Shelter;