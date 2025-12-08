const express= require('express')
const router = express.Router({ mergeParams: true })
const {registerShelter}=require("../controllers/shelter_controller")


router.post("/register",registerShelter)

router.get("/:id/pets",(req, res) => {
  //todo get pet details
})
router.get("/:id",(req, res) => {
  //todo 
})
router.get("/",(req, res) => {
  //todo all shelter deatil
})
router.put("/:id",(req, res) => {
  //todo shelter admin
})
router.delete("/:id",(req, res) => {
  //todo
})

module.exports=router;