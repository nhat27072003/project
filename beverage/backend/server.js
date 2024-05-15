const express = require('express');
const app = express();
const router = require('./src/routes/web');
require('dotenv').config();
const cors = require('cors');
var bodyParser = require('body-parser');

const port = process.env.PORT || 8081
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// const { fail } = require('assert');
// app.use(cors());
// var request = new sql.Request();
// //app.use(express.json());
// /*
// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });
// */
// // Thiết lập Multer để lưu trữ ảnh trong thư mục 'imageproduct'
app.use(cors());
app.use(router);

app.listen(port, () => {
    console.log(`Server is starting at port: ${port}`)
});
