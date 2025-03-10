const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Middleware to parse JSON data
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Signup Route
app.post("/signup", upload.single("image"), (req, res) => {
  const { name, phone, email, password } = req.body;
  const image = req.file;

  if (!image) {
    return res.status(400).send("Image upload failed.");
  }

  console.log("User data:", { name, phone, email, password });
  console.log("Uploaded image:", image);

  res.status(201).send({
    message: "Signup successful!",
    user: { name, phone, email },
    imageUrl: `/uploads/${image.filename}`,
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
