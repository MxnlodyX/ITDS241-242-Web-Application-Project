const express = require("express");
const multer = require("multer");
const path = require("path");
const dbConnection = require("./dbConnection");
const jwt = require("jsonwebtoken");
const authorize = require("./authorization");
const router = express.Router();

// check ว่ามีfolder รึยังถ้ายังจะทำการสร้างให้ และ เปลี่ยนชื่อไฟล์เป็น time stamp เวลา upload รูปภาพ
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({storage});

// Login Admin
//Testing Login 1
//ตัวอย่างการใส่ข้อมูลเอกสารหน้า 50 Administrator Login
//Method: POST
//URL: http://localhost:5001/api_service/adminLogin
//Body: raw JSON
// {
//   "adminUsername" : "MxnlodyX",
//   "adminPassword" : "12345"
// }

//Testing Login 2
//Method: POST
//URL: http://localhost:5001/api_service/adminLogin
//Body: raw JSON
// {
//   "adminUsername" : "Navadol",
//   "adminPassword" : "1234"
// }
router.post("/adminLogin", (req, res) => {
  //รับข้อมูลจาก client
  const {adminUsername, adminPassword} = req.body;
  if (!adminUsername || !adminPassword) {
    //หากขาดข้อมูลให้ตอบกลับด้วย status 400 และข้อความ "Please Provide adminUsername and adminPassword"
    return res.status(400).json({success: false, message: "Please Provide adminUsername and adminPassword"});
  }
  //คำสั่ง query
  dbConnection.query("SELECT * FROM adminAccount WHERE username = ? AND password = ?", [adminUsername, adminPassword], function (err, results) {
    if (err) {
      //หากเกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูลให้ตอบกลับด้วย status 500 และข้อความ "Database error"
      return res.status(500).json({success: false, message: "Database Error"});
    }
    if (results.length === 0) {
      //หากไม่พบข้อมูล admin ให้ตอบกลับไปด้วย status 401 และ่ข้อความ "Invalid adminUsername or adminPassword"
      return res.status(401).json({success: false, message: "Invalid adminUsername or adminPassword"});
    }
    const adminData = results[0];
    const jwtToken = jwt.sign({adminUsername: adminData.username, Admin_ID: adminData.Admin_ID.toString()}, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    //ส่ง token และ ข้อมูล
    return res.status(200).json({success: true, token: jwtToken, adminData});
  });
});

// เพิ่ม Admin
//Testing Insert a new Admin Account 1
//ตัวอย่างการใส่ข้อมูลเอกสารหน้า 52 Add Admin Account
//Method: POST
//Auth type: Bearer token
//URL: http://localhost:5001/api_service/InsertAdmin
//body: raw form-data (ต้องมีการ upload รูปจึงใช้ form-data)
//  {
//  username : Admin_Sudlhor01
//  password : admin12345
//  email : Admin_lhor@mu.com
//  first_name : Navadol
//  last_name : Somboonkul
//  gender : M
//  tel_number : 0987654321
//  address : Mahidol dormitory
//  position : Product Manager
//  profile_image : ไปที่ IMG_for_api_testing กดอัปโหลดไฟล์ใน POSTMAN แล้วเลือก Add_Admin1.jpg
//  }

//Testing Insert a new Admin Account 2
//Method: POST
//Auth type: Bearer token
//URL: http://localhost:5001/api_service/InsertAdmin
//body: raw form-data
//  {
//  username : Admin_Sudsuay01
//  password : admin12345
//  email : Admin_suay@mu.com
//  first_name : Sukanya
//  last_name : Somboonkul
//  gender : M
//  tel_number : 0912345678
//  address : Mahidol dormitory
//  position : Product Manager
//  profile_image : ไปที่ IMG_for_api_testing กดอัปโหลดไฟล์ใน POSTMAN แล้วเลือก Add_Admin2.png
//  }

router.post("/InsertAdmin", authorize, upload.single("profile_image"), (req, res) => {
  //รับข้อมูลจาก client
  const a = ({email, username, password, first_name, last_name, gender, tel_number, address, position} = req.body);
  const profile_image = req.file ? req.file.filename : null;
  //หากขาดข้อมูลให้ตอบกลับด้วย status 400 และข้อความ "All fields are required"
  if (!email || !username || !password || !first_name || !last_name || !gender || !tel_number || !address || !position || !profile_image) {
    return res.status(400).json({success: false, message: "All fields are required"});
  }
  //คำสั่ง query
  const insertQuery =
    "INSERT INTO adminAccount (email, username, password, f_name, l_name, gender, tel_number, address, position, profile_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  dbConnection.query(
    insertQuery,
    [email, username, password, first_name, last_name, gender, tel_number, address, position, profile_image],
    (err, results) => {
      if (err) {
        //หากเกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูลให้ตอบกลับด้วย status 500 และข้อความ "Database error"
        return res.status(500).json({success: false, message: "Database Error"});
      }
      //ส่งข้อมูล
      return res.status(200).json({success: true, message: "Admin successfully added!", data: results});
    }
  );
});

// Update Admin
//Testing Update Admin Account 1
//ตัวอย่างการใส่ข้อมูลเอกสารหน้า 54 Update Admin Account
//Method: PUT
//Auth type: Bearer token
//URL: http://localhost:5001/api_service/UpdateAdmin/1
//body: raw form-data
//  {
//  first_name : UpdateTesting01
//  }

//Testing Update Admin Account 2
//Method: PUT
//Auth type: Bearer token
//URL: http://localhost:5001/api_service/UpdateAdmin/1
//body: raw form-data
//  {
//  email : UppdateTesting02@mu.com
//  }

router.put("/UpdateAdmin/:Admin_ID", upload.single("profile_image"), authorize, (req, res) => {
  // รับ Admin_ID จาก URL
  const Admin_ID = req.params.Admin_ID;
  if (!Admin_ID) {
    // หากไม่ได้รับ parameter จะส่ง status 400 และข้อความ "Please provide Admin ID."
    return res.status(400).json({
      error: true,
      message: "Please provide an Admin ID.",
    });
  }
  // รับข้อมูลจาก client
  const {email, username, password, first_name, last_name, gender, tel_number, address, position} = req.body;
  const profile_image = req.file ? req.file.filename : null;

  // สร้างคำสั่ง query
  let updateQuery = `UPDATE adminAccount SET `;
  const attribute = [];
  // เพิ่ม query parameters เฉพาะข้อมูลที่ส่งมา
  if (email) {
    updateQuery += `email = ?, `;
    attribute.push(email);
  }
  if (username) {
    updateQuery += `username = ?, `;
    attribute.push(username);
  }
  if (password) {
    updateQuery += `password = ?, `;
    attribute.push(password);
  }
  if (first_name) {
    updateQuery += `f_name = ?, `;
    attribute.push(first_name);
  }
  if (last_name) {
    updateQuery += `l_name = ?, `;
    attribute.push(last_name);
  }
  if (gender) {
    updateQuery += `gender = ?, `;
    attribute.push(gender);
  }
  if (tel_number) {
    updateQuery += `tel_number = ?, `;
    attribute.push(tel_number);
  }
  if (address) {
    updateQuery += `address = ?, `;
    attribute.push(address);
  }
  if (position) {
    updateQuery += `position = ?, `;
    attribute.push(position);
  }
  if (profile_image) {
    updateQuery += `profile_image = ?, `;
    attribute.push(profile_image);
  }

  // รวม WHERE Clause
  updateQuery = updateQuery.slice(0, -2); // ตัด ", " ตัวสุดท้ายออก
  updateQuery += ` WHERE Admin_ID = ?`;
  attribute.push(Admin_ID);
  // เรียกใช้ SQL query
  dbConnection.query(updateQuery, attribute, (err, results) => {
    if (err) {
      // หากเกิดข้อผิดพลาด ให้ส่งกลับด้วย status 500 และข้อความ "Database error"
      console.error("Error updating admin data: ", err);
      return res.status(500).json({
        success: false,
        message: "Error updating admin data.",
        error: err.message,
      });
    }
    if (results.affectedRows === 0) {
      // หากไม่พบข้อมูล Admin ให้ส่งกลับด้วย status 404 และข้อความ "Admin not found."
      return res.status(404).json({
        success: false,
        message: "Admin not found.",
      });
    }
    // ส่ง respond และข้อความ "Admin updated successfully!"
    return res.status(200).json({
      success: true,
      message: "Admin updated successfully!",
    });
  });
});

// Delete Admin
//Testing DELETE Admin Account 1
//Auth Type: Bearer Token
//Method: DELETE
//URL: http://localhost:5001/api_service/adminDL/ { เลือก ID จาก Account 2 ล่าสุด ที่สร้าง โดยดูได้ใน All admin หลังจาก Login }

//Testing DELETE Admin Account 2
//Auth Type: Bearer Token
//Method: DELETE
//URL: http://localhost:5001/api_service/adminDL/ { เลือก ID จาก Account 2 ล่าสุด ที่สร้าง โดยดูได้ใน All admin หลังจาก Login }

router.delete("/adminDL/:Admin_ID", authorize, (req, res) => {
  // ดึงรหัส admin จาก parameter ใน URL
  const Admin_ID = req.params.Admin_ID;

  if (!Admin_ID) {
    // หากขาดข้อมูลให้ตอบกลับด้วย status 400 และข้อความ "Please provide Admin ID"
    return res.status(400).json({success: false, message: "Please provide Admin ID"});
  }
  // หลังจากลบไฟล์แล้ว, ลบข้อมูลจากฐานข้อมูล
  dbConnection.query("DELETE FROM adminAccount WHERE Admin_ID = ?", [Admin_ID], (err, results) => {
    if (err) {
      return res.status(500).json({success: false, message: "Database Error"});
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({success: false, message: "Admin not found"});
    }
    return res.status(200).json({success: true, message: "Admin deleted successfully"});
  });
});

// แสดงข้อมูล Admin
// Show ALL Admin Account
// METHOD: Get
// Auth Type: Bearer Token
// URL: http://localhost:5001/api_service/adminInfo/

router.get("/adminInfo/", authorize, (req, res) => {
  //คำสั่ง query
  const query = "SELECT * FROM adminAccount ";
  dbConnection.query(query, (err, results) => {
    if (err) {
      //หากเกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูลให้ตอบกลับด้วย status 500 และข้อความ "Database error"
      return res.status(500).json({success: false, message: "Database Error"});
    }
    //ส่งข้อมูล
    return res.status(200).json({success: true, data: results});
  });
});

// ค้าหาข้อมูล Admin จาก Admin_ID
// Show Admin Account With ID = 1
// Method: GET
// Auth Type: Bearer Token
// URL: http://localhost:5001/api_service/adminInfo/1

// Show Admin Account With ID = 2
// Method: GET
// Auth Type: Bearer Token
// URL: http://localhost:5001/api_service/adminInfo/2

router.get("/adminInfo/:Admin_ID", authorize, (req, res) => {
  //โดยจะดึงรหัส admin ผ่าน parameter ใน URL
  const Admin_ID = req.params.Admin_ID;
  //คำสั่ง query
  const query = "SELECT * FROM adminAccount WHERE Admin_ID = ?";
  dbConnection.query(query, Admin_ID, (err, results) => {
    if (err) {
      //หากเกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูลให้ตอบกลับด้วย status 500 และข้อความ "Database error"
      return res.status(500).json({success: false, message: "Database Error"});
    }
    if (results.length === 0) {
      return res.status(404).json({success: false, message: "Data not foundd"});
    }
    //ส่งข้อมูล
    return res.status(200).json({success: true, data: results});
  });
});

//ค้าหา Admin ด้วย Parameter
//Seach Admin Account With Parameters 1 (ค้นหาคนที่ Username ชื่อ MxnlodyX)
// Method: GET
// Auth Type : Bearer Token
// URL: http://localhost:5001/api_service/searchAdmin/?name&username=MxnlodyX&email

//ค้าหา Admin ด้วย Parameter
//Seach Admin Account With Parameters 2 (ค้นหาคนที่อีเมลชื่อว่า Navadol)
// Method: GET
// Auth Type : Bearer Token
// URL: http://localhost:5001/api_service/searchAdmin/?name&username&email=navadol

router.get("/searchAdmin", authorize, (req, res) => {
  //รับข้อมูลจาก client
  const {name, email, username} = req.query;

  //คำสั่ง query
  let query = "SELECT * FROM adminAccount WHERE 1=1";
  //สร้างตัวแปรสำหรับจัดเก็บ parameter ในการเรียกข้อมูจาก database
  const params = [];

  //เพิ่ม query parameters ที่ใส่เข้ามาเพื่อ select ข้อมูล
  if (name) {
    query += " AND (f_name LIKE ? OR l_name LIKE ?)";
    params.push(`%${name}%`, `%${name}%`);
  }
  if (email) {
    query += " AND email LIKE ?";
    params.push(`%${email}%`);
  }
  if (username) {
    query += " AND username LIKE ?";
    params.push(`%${username}%`);
  }
  // เรียกใช้ SQL query
  dbConnection.query(query, params, (err, results) => {
    if (err) {
      //หากเกิดข้อผิดพลาด (error) ในการเชื่อมต่อฐานข้อมูล ให้ตอบกลับไปด้วย status 500 และ่ข้อความ "Database error"
      console.error("Error fetching data:", err);
      return res.status(500).json({
        success: false,
        message: "Database error",
      });
    }
    //หากไม่พบข้อมูลสินค้า ให้ตอบกลับไปด้วย status 200 และ่ข้อความ "No data found"
    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No data found",
        data: [],
      });
    }
    //ส่งข้อมูล
    res.status(200).json({
      success: true,
      data: results,
    });
  });
});
module.exports = router;
