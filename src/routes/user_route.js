const express= require('express')
const router = express.Router({ mergeParams: true })
const {authenticateAdmin}=require("../middlewares/authenticateUser_middleware")
const {getSingleUser, deleteUser, updateUser, getallUser,getUserPet}=require("../controllers/user_controller")


router.get("/:id",getSingleUser )

router.put("/:id",updateUser)

router.delete("/:id",deleteUser)

router.get("/:id/pets",getUserPet)
router.get("/",authenticateAdmin,getallUser)


module.exports=router;