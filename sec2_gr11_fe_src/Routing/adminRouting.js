const express = require('express');
const path = require('path');
const router = express.Router();


router.get('/AdminSide/Dashboard', (req, res) => {
    console.log("Request at " + req.url);
    res.sendFile(path.join(__dirname, '../public/AdminSide/Dashboard.html'));
});

// Route สำหรับข้อมูล Admin
router.get('/AdminSide/Admin_Info', (req, res) => {
    console.log("Request at " + req.url);
    res.sendFile(path.join(__dirname, '../public//AdminSide/All_Admin.html'));
});

router.get('/AdminSide/Product_Info', (req, res) => {
    console.log("Request at " + req.url);
    res.sendFile(path.join(__dirname, '../public/AdminSide/All_Product.html'));
});

router.get('/AdminSide/Add-Account', (req, res) => {
    console.log("Request at " + req.url);
    res.sendFile(path.join(__dirname, '../public/AdminSide/Action_page/add-user-account.html'));
});

router.get('/AdminSide/Edit-Account', (req, res) => {
    console.log("Request at " + req.url);
    res.sendFile(path.join(__dirname, '../public/AdminSide/Action_page/edit-admin.html'));
});
router.get('/AdminSide/Search_Admin', (req, res) => {
    console.log("Request at " + req.url);
    res.sendFile(path.join(__dirname, '../public/AdminSide/Action_page/search-admin.html'));
});
router.get('/AdminSide/View_Admin', (req, res) => {
    console.log("Request at " + req.url);
    res.sendFile(path.join(__dirname, '../public/AdminSide/Action_page/view-admin.html'));

});

router.get('/AdminSide/Add-Product', (req, res) => {
    console.log("Request at " + req.url);
    res.sendFile(path.join(__dirname, '../public/AdminSide/Action_page/add-product.html'));
});

router.get('/AdminSide/Edit-Product', (req, res) => {
    console.log("Request at " + req.url);
    res.sendFile(path.join(__dirname, '../public/AdminSide/Action_page/edit-product.html'));
});
router.get('/AdminSide/Search_Product', (req, res) => {
    console.log("Request at " + req.url);
    res.sendFile(path.join(__dirname, '../public/AdminSide/Action_page/search-product.html'));
});
router.get('/AdminSide/View_Product', (req, res) => {
    console.log("Request at " + req.url);
    res.sendFile(path.join(__dirname, '../public/AdminSide/Action_page/view-product.html'));

});
module.exports = router;
