const express = require('express');
const router = express.Router();
const upload = require('../config/upload.js');
const { getAllUsers, createUser, deleteUser ,getUserById,updateUserImage } = require('../controllers/usersControllers');



router.get('/', getAllUsers);
router.get('/:id', getUserById);

//POst ajouter avec image
router.post("/", createUser);

router.delete("/:id", deleteUser);

router.put("/:id/image",upload.single("image"), updateUserImage);



module.exports = router;