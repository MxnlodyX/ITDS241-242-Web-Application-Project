const express = require("express");
const path = require('path');
const router = express.Router();
const app = express();
const dotenv = require('dotenv');
const adminiRouter = require('./Routing/adminRouting');
const publicRouter = require('./Routing/publicRouting');
dotenv.config();

//middleware for css js (set public to root folder)
app.use(express.static(path.join(__dirname, "public")));

// Routers
app.use(publicRouter);
app.use(adminiRouter);

// Middleware 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '/public/404.html'));
});

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server listening at Port ${process.env.PORT}`);
});