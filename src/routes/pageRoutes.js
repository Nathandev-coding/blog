const express = require("express");
const router = express.Router();
const path = require("path");


//acceuill
router.get("/", (req,res)  =>{
    res.sendFile(path.join(__dirname, "../public/index.html"));
})

//blogpage
router.get("/blog", (req,res)  =>{
    res.sendFile(path.join(__dirname, "../public/blogPage.html"));
})

//article detail
router.get("/info", (req,res)  =>{
    res.sendFile(path.join(__dirname, "../public/articleDetail.html"));
})

//staff
router.get("/staff", (req,res)  =>{
    res.sendFile(path.join(__dirname, "../public/staff.html"));
})

//staff
router.get("/calendrier", (req,res)  =>{
    res.sendFile(path.join(__dirname, "../public/calendrier.html"));
})

module.exports = router;