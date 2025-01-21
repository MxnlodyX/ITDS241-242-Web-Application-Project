const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/homepage', (req, res) => {
    console.log("Request at " + req.url);
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/about_us', (req, res) => {
    console.log("Request at " + req.url);
    res.sendFile(path.join(__dirname, '../public/about_us.html'));
});

router.get('/products', (req, res) => {
    console.log("Request at " + req.url);
    res.sendFile(path.join(__dirname, '../public/Show_Product.html'));
});

router.get('/detail_product', (req, res) => {
    console.log("Request at " + req.url);
    res.sendFile(path.join(__dirname, '../public/detail_product.html'));
});

router.get('/Advance_search', (req, res) => {
    console.log("Request at " + req.url);
    res.sendFile(path.join(__dirname, '../public/Advance_search.html'));
});
router.get('/Our_store', (req, res) => {
    console.log("Request at " + req.url);
    res.sendFile(path.join(__dirname, '../public/find_store.html'));
});
router.get('/login', (req, res) => {
    console.log("Request at " + req.url);
    res.sendFile(path.join(__dirname, '../public/login.html'));
});
module.exports = router;
