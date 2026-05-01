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

//admin dashboard
router.get("/a/dashboard", (req,res)  =>{
    res.sendFile(path.join(__dirname, "../public/admin/dashboard.html"));
})

//admin article management dashboard
router.get("/a/article-management", (req,res)  =>{
    res.sendFile(path.join(__dirname, "../public/admin/articleAdmin.html"));
})

//users management dashboard
router.get("/a/users", (req,res)  =>{
    res.sendFile(path.join(__dirname, "../public/admin/userManagement.html"));
})

//users management dashboard
router.get("/a/userdetail", (req,res)  =>{
    res.sendFile(path.join(__dirname, "../public/admin/userDetail.html"));
})

module.exports = router;