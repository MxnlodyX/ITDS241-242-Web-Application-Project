const express = require("express");
const multer = require("multer");
const path = require("path");
const dbConnection = require("./dbConnection");
const authorize = require("./authorization");
const router = express.Router();

// check ว่ามีfolder รึยังถ้ายังจะทำการสร้างให้ และ เปลี่ยนชื่อไฟล์
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({storage});

// เพิ่ม product #####
//Testing Insert a new product 1
//Method: POST
//Auth type: Bearer token
//URL: http://localhost:5001/api_service/addProduct
//body: raw form-data (ต้องมีการ upload รูปจึงใช้ form-data)
//  {
//  product_name : PUMA-Cilla-patent
//  product_type : Sneaker
//  product_price : 1900
//  product_collection : Winter
//  product_gender : F
//  product_description : SNEAKER MATCH WITH EVERY LOOK
//  product_image : Product_Test1.jpg
//  }

//Testing Insert a new product 2
//Method: POST
//Auth type: Bearer token
//URL: http://localhost:5001/api_service/addProduct
//body: raw form-data
//  {
//  product_name : PUMA-ZAZA-Inw
//  product_type : Shirt
//  product_price : 4000
//  product_collection : Summer
//  product_gender : M
//  product_description : This is a cool shirt
//  product_image : Product_Test2.jpg
//  }

//เพิ่มข้อมูลสินค้าลงในฐานข้อมูล โดยใช้ HTTP POST เพื่อรับข้อมูลจาก client และบันทึกลงในตาราง Product ในฐานข้อมูล
router.post("/addProduct", upload.single("product_image"), authorize, (req, res) => {
  //รับข้อมูลจาก client
  const {product_name, product_type, product_price, product_collection, product_gender, product_description} = req.body;
  const product_image = req.file ? req.file.filename : null;

  if (!product_name || !product_type || !product_price || !product_collection || !product_gender || !product_description || !product_image) {
    //หากขาดข้อมูลให้ตอบกลับด้วย status 400 และข้อความ "Please provide product information"
    return res.status(400).json({
      success: false,
      message: "Please provide product information",
    });
  }
  //คำสั่ง query
  const insertQuery =
    "INSERT INTO Product (product_name, product_type, product_price, product_collection, gender, product_description, image) VALUES (?, ?, ?, ?, ?, ?, ?)";
  //เพิ่มข้อมูลสินค้าลงในฐานข้อมูล
  dbConnection.query(
    insertQuery,
    [product_name, product_type, product_price, product_collection, product_gender, product_description, product_image],
    (err, results) => {
      if (err) {
        //หากเกิดข้อผิดพลาดในการเพิ่มข้อมูลสินค้าลงในฐานข้อมูลให้ตอบกลับด้วย status 500 และข้อความ "Database error"
        console.error("Error fetching data:", err);
        return res.status(500).json({
          success: false,
          message: "Database error",
        });
      }
      //หากการเพิ่มข้อมูลสินค้าสำเร็จให้ส่งข้อมูลสินค้า และตอบกลับด้วยข้อความ "New product has been created successfully."
      return res.send({
        success: true,
        message: "New product has been created successfully.",
        data: results,
      });
    }
  );
});

// แสดงข้อมูล product
// Show ALL product
// METHOD: Get
// URL: http://localhost:5001/api_service/showProduct

//แสดงสินค้าทั้งหมดจากฐานข้อมูล
router.get("/showProduct", (req, res) => {
  dbConnection.query("SELECT * FROM product", (err, results) => {
    if (err) {
      //หากเกิดข้อผิดพลาด (error) ในการเชื่อมต่อฐานข้อมูล ให้ตอบกลับไปด้วย status 500 และ่ข้อความ "Database error"
      console.error("Error fetching product:", err);
      return res.status(500).json({
        success: false,
        message: "Database error",
      });
    }
    //ส่งข้อมูลสินค้า
    return res.status(200).json({
      success: true,
      results: results,
    });
  });
});

// แสดงข้อมูล product ด้วย ID
// Show product with ID = 8
// METHOD: Get
// URL: http://localhost:5001/api_service/showProduct/8

// Show product with ID = 9
// METHOD: Get
// URL: http://localhost:5001/api_service/showProduct/9

//แสดงสินค้าจากฐานข้อมูล และ ส่งผลลัพท์ของสินค้าที่มีรหัสสินค้าตรงตามกำหนด
router.get("/showProduct/:product_ID", (req, res) => {
  //โดยจะดึงรหัสสินค้าผ่าน parameter ใน URL
  const product_ID = req.params.product_ID;
  if (!product_ID) {
    //หากไม่ได้รับ parameter จะส่ง status 400 และข้อความ "Product ID is required"
    return res.status(400).json({
      success: false,
      message: "Product ID is required",
    });
  }
  const query = "SELECT * FROM product WHERE product_ID = ?";
  dbConnection.query(query, [product_ID], (err, results) => {
    if (err) {
      //หากเกิดข้อผิดพลาด (error) ในการเชื่อมต่อฐานข้อมูล ให้ตอบกลับไปด้วย status 500 และ่ข้อความ Database error"
      console.error("Error fetching product:", err);
      return res.status(500).json({
        success: false,
        message: "Database error",
      });
    }
    if (results.length === 0) {
      //หากไม่พบข้อมูลสินค้า ให้ตอบกลับไปด้วย status 404 และ่ข้อความ "Product not found"
      return res.status(404).json({
        success: false,
        message: "Product not found",
        data: [],
      });
    }
    //ส่งข้อมูลสินค้า
    return res.status(200).json({
      success: true,
      data: results,
    });
  });
});

//แสดงข้อมูลโดยมีการเรียงลำดับสินค้าที่เข้าสู่ฐานข้อมูล 5 อันล่าสุด
//สามารถ Test ได้โดยการไปที่ website ฝั่ง Front  แล้วกดที่หน้า HOME โดยเลื่อนลงมาจะมีสินค้า Product release จำนวน 5 ชิ้น
// หรือทดสอบผ่าน Postman เพื่อความแม่นยำในการตรวจไอดีสินค้าล่าสุด
// METHOD: GET
// URL: http://localhost:5001/api_service/shownewrelease
router.get("/shownewrelease", (req, res) => {
  //Query แสดงสินค้าโดยเรียงลำดับจาก5อันล่าสุด
  dbConnection.query("SELECT * FROM product ORDER BY product_ID DESC LIMIT 5", (err, results) => {
    if (err) {
      //หากเกิดข้อผิดพลาด (error) ในการเชื่อมต่อฐานข้อมูล ให้ตอบกลับไปด้วย status 500 และ่ข้อความ "Database error"
      console.error("Error fetching product:", err);
      return res.status(500).json({
        success: false,
        message: "Database error",
      });
    }
    //ส่งข้อมูลสินค้า
    return res.status(200).json({
      success: true,
      results: results,
    });
  });
});

// แสดงสินค้าจากประเภทสินค้าที่เลือก
//สามารถ Test โดยการไปที่ website ฝั่ง Front แล้วกดที่ Navbar ที่แสดงชื่อประเภทสินค้าต่าง
//หรือทดสอบผ่าน Postman เพื่อความแม่นยำในการตรวจสินค้าในประเภทนั้นๆๆ
// METHOD: GET
// URL: http://localhost:5001/api_service/showproduct/type/{ProductType}
// {Sneaker, Hat, Shirt, Running, Football} ประเภทสินค้าทั้งหมดที่สามารถเลือกทดลองค้นหา
router.get("/showProduct/type/:product_type", (req, res) => {
  //โดยจะดึงประเภทสินค้าผ่าน parameter ใน URL
  const product_type = req.params.product_type;
  if (!product_type) {
    //หากไม่ได้รับ parameter จะส่ง status 400 และข้อความ "Product type is required"
    return res.status(400).json({
      success: false,
      message: "Product type is required",
    });
  }
  //คำสั้ง query
  const query = "SELECT * FROM product WHERE product_type = ?";
  dbConnection.query(query, [product_type], (err, results) => {
    if (err) {
      //หากเกิดข้อผิดพลาด (error) ในการเชื่อมต่อฐานข้อมูล ให้ตอบกลับไปด้วย status 500 และ่ข้อความ "Database error"
      console.error("Error fetching product:", err);
      return res.status(500).json({
        success: false,
        message: "Database error",
      });
    }
    //หากไม่พบข้อมูลสินค้า ให้ตอบกลับไปด้วย status 404 และ่ข้อความ "Product not found"
    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
        data: [],
      });
    }
    //ส่งข้อมูลสินค้า
    return res.status(200).json({
      success: true,
      data: results,
    });
  });
});

// Delete product
//Testing DELETE product 10
//Auth Type: Bearer Token
//Method: DELETE
//URL: http://localhost:5001/api_service/productDL/10

//Testing DELETE product 11
//Auth Type: Bearer Token
//Method: DELETE
//URL: http://localhost:5001/api_service/productDL/11

//ลบสินค้าจากรหัสสินค้า
router.delete("/productDL/:PID", authorize, (req, res) => {
  //โดยจะดึงรหัสสินค้าผ่าน parameter ใน URL
  let PID = req.params.PID;
  if (!PID) {
    //หากไม่ได้รับ parameter จะส่ง status 400 และข้อความ "Please provide Product id"
    return res.status(400).send({
      success: false,
      message: "Please provide Product id",
    });
  }
  //คำสั่ง query
  dbConnection.query("DELETE FROM Product WHERE product_ID = ?", PID, function (error, result) {
    //หากเกิดข้อผิดพลาด (error) ให้แสดง error กลับมา
    if (error) {
      //หากเกิดข้อผิดพลาด (error) ในการเชื่อมต่อฐานข้อมูล ให้ตอบกลับไปด้วย status 500 และ่ข้อความ "Database error"
      console.error("Error fetching product:", err);
      return res.status(500).json({
        success: false,
        message: "Database error",
      });
    }
    if (result.affectedRows === 0) {
      //หากไม่พบข้อมูลสินค้า ให้ตอบกลับไปด้วย status 404 และ่ข้อความ "Product not found"
      return res.status(404).json({
        success: false,
        message: "Product not found",
        data: [],
      });
    }
    return res.status(200).send({
      //ส่ง respond และข้อความ "Product has been deleted successfuly."
      success: true,
      message: "Product has been deleted successfully.",
    });
  });
});

//ค้าหา product ด้วย Parameter
//Seach product With Parameters 1 (ค้นหา product ที่ชื่อ PUMA)
// Method: GET
// Auth Type : Bearer Token
// URL: http://localhost:5001/api_service/searchProduct/?productname=PUMA&producttype=&gender=

//ค้าหา Admin ด้วย Parameter
//Seach product With Parameters 2 (ค้นหา product ที่เป็นประเภทเสื้อ Shirt)
// Method: GET
// Auth Type : Bearer Token
// URL: http://localhost:5001/api_service/searchProduct/?productname=&producttype=Shirt&gender=

//ค้นหาสินค้า
router.get("/searchProduct", (req, res) => {
  //กำหนดค่าใน request
  const {productname, producttype, gender} = req.query;

  //คำสั้ง query
  let query = "SELECT * FROM product WHERE 1=1";
  //สร้างตัวแปรสำหรับจัดเก็บ parameter ในการเรียกข้อมูจาก database
  const params = [];

  //เพิ่ม query parameters ที่ใส่เข้ามาเพื่อ select ข้อมูล
  if (productname) {
    query += " AND product_name LIKE ? ";
    params.push(`%${productname}%`);
  }
  if (producttype) {
    query += " AND product_type LIKE ?";
    params.push(`%${producttype}%`);
  }
  if (gender) {
    query += " AND gender LIKE ?";
    params.push(`%${gender}%`);
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
    if (results.length === 0) {
      //หากไม่พบข้อมูลสินค้า ให้ตอบกลับไปด้วย status 200 และ่ข้อความ "No data found"
      return res.status(200).json({
        success: false,
        message: "No data found",
        data: [],
      });
    }
    //ส่งข้อมูลสินค้า
    res.status(200).json({
      success: true,
      data: results,
    });
  });
});

// อัปเดต product #####
//Testing Update product 1
//Method: PUT
//Auth type: Bearer token
//URL: http://localhost:5001/api_service/UpdateProduct/30
//body: raw form-data (ต้องมีการ upload รูปจึงใช้ form-data)
//  {
//  product_name : รองเท้าสุดจ๊าบสุดเท่
//  product_price : 20000
//  image : Product_Update1.jpg
//  }

//Testing Update product 2
//Method: PUT
//Auth type: Bearer token
//URL: http://localhost:5001/api_service/UpdateProduct/19
//body: raw form-data
//  {
//  product_type : Shirt
//  product_collection : Summer
//  gender : M
//  product_description : This is a cool shirt
//  }

//อัปเดตสินค้าจากรหัสสินค้า
router.put("/UpdateProduct/:product_ID", upload.single("image"), authorize, (req, res) => {
  //รับ product_ID จาก URL
  let product_ID = req.params.product_ID;
  if (!product_ID) {
    //หากไม่ได้รับ parameter จะส่ง status 400 และข้อความ "Please provide Product id"
    return res.status(400).json({
      error: true,
      message: "Please provide a Product ID.",
    });
  }
  //รับข้อมูล product จาก client
  const {product_name, product_type, product_price, product_collection, gender, product_description} = req.body;
  //ตรวจสอบไฟล์ภาพ
  const image = req.file ? req.file.filename : null;
  //สร้างคำสั่ง query
  let updateQuery = `UPDATE Product SET `;
  const attribute = [];
  //เพิ่ม query parameters ที่ใส่เข้ามาเพื่อ update ข้อมูล
  if (product_name) {
    updateQuery += `product_name = ?, `;
    attribute.push(product_name);
  }
  if (product_type) {
    updateQuery += `product_type = ?, `;
    attribute.push(product_type);
  }
  if (product_price) {
    updateQuery += `product_price = ?, `;
    attribute.push(product_price);
  }
  if (product_collection) {
    updateQuery += `product_collection = ?, `;
    attribute.push(product_collection);
  }
  if (gender) {
    updateQuery += `gender = ?, `;
    attribute.push(gender);
  }
  if (product_description) {
    updateQuery += `product_description = ?, `;
    attribute.push(product_description);
  }
  if (image) {
    updateQuery += `image = ?, `;
    attribute.push(image);
  }

  // รวม WHERE Clause:
  updateQuery = updateQuery.slice(0, -2); // ตัด ", " ตัวสุดท้ายออก
  updateQuery += ` WHERE product_ID = ?`;
  attribute.push(product_ID);

  // เรียกใช้ SQL query
  dbConnection.query(updateQuery, attribute, (err, results) => {
    if (err) {
      //หากเกิดข้อผิดพลาด (error) ในการเชื่อมต่อฐานข้อมูล ให้ตอบกลับไปด้วย status 500 และ่ข้อความ "Database error"
      console.error("Error updating product data: ", err);
      return res.status(500).json({
        success: false,
        message: "Error updating product data",
        error: err.message,
      });
    }
    if (results.affectedRows === 0) {
      ///หากไม่พบข้อมูลสินค้า ให้ตอบกลับไปด้วย status 200 และ่ข้อความ "Product not found."
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }
    //ส่ง respond และข้อความ "Product has been updated successfuly."
    return res.status(200).json({
      success: true,
      message: "Product data updated successfully!",
      data: results,
    });
  });
});

//ค้าหา product ด้วย Parameter ใน Advnace Search
//Seach product With Parameters 4 และ 5 (ค้นหา product ที่อยู่ใน Collection Summer และ ราคาอย่างน้อย 3000)
// Method: GET
// Auth Type : Bearer Token
// URL: http://localhost:5001/api_service/advanceSearchProduct?productname=&producttype&gender=&collection=Summer&min=3000&max

//ค้าหา Admin ด้วย Parameter
//Seach product With Parameters 3 (ค้นหา product สำหรับเพศ M )
// Method: GET
// Auth Type : Bearer Token
// URL: http://localhost:5001/api_service/advanceSearchProduct?productname&producttype&gender=M&collection&min&max

//ค้นหาสินค้าผ่าน form จากหน้า Advance Search
router.get("/advanceSearchProduct", (req, res) => {
  //รับข้อมูลจาก client
  const {productname, producttype, gender, collection, min, max} = req.query;
  //คำสั่ง query
  let query = "SELECT * FROM product WHERE 1=1";
  //สร้างตัวแปรสำหรับจัดเก็บ parameter ในการเรียกข้อมูจาก database
  const params = [];
  //เพิ่ม query parameters ที่ใส่เข้ามาเพื่อ select ข้อมูล
  if (productname) {
    query += " AND product_name LIKE ?";
    params.push(`%${productname}%`);
  }
  if (producttype) {
    query += " AND product_type LIKE ?";
    params.push(`%${producttype}%`);
  }
  if (gender) {
    query += " AND gender LIKE ?";
    params.push(`%${gender}%`);
  }
  if (collection) {
    query += " AND product_collection LIKE ?";
    params.push(`%${collection}%`);
  }
  if (min) {
    query += " AND product_price >= ?";
    params.push(Number(min));
  }
  if (max) {
    query += " AND product_price <= ?";
    params.push(Number(max));
  }

  // เรียกใช้ the query
  dbConnection.query(query, params, (err, results) => {
    if (err) {
      //หากเกิดข้อผิดพลาด (error) ในการเชื่อมต่อฐานข้อมูล ให้ตอบกลับไปด้วย status 500 และ่ข้อความ "Database error"
      console.error("Error fetching data:", err);
      return res.status(500).json({
        success: false,
        message: "Database error",
      });
    }

    if (results.length === 0) {
      ///หากไม่พบข้อมูลสินค้า ให้ตอบกลับไปด้วย status 200 และ่ข้อความ "Product not found."
      return res.status(404).json({
        success: false,
        message: "No products found",
        data: [],
      });
    }

    //หากค้นหาสินค้าสำเร็จให้ส่ง status 200 และส่ง resluts กลับไป
    return res.status(200).json({
      success: true,
      data: results,
    });
  });
});
module.exports = router;
