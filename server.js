import express from "express";
import morgan from "morgan";
import "./db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import levelRoutes from "./routes/levelRoutes.js";
import locationRoutes from "./routes/locationRoutes.js";
import uniNameRoutes from "./routes/uniNameRoutes.js";
import scholarshipRoutes from "./routes/scholarshipRoutes.js";
import uNameTagRoutes from "./routes/uNameTagRoutes.js";
import cors from "cors";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/tmp"); // writable in Lambda/Vercel
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

const app = express();

// Middleware
app.use(cors());

app.use(express.json());
app.use(morgan("dev"));

//Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/programlevel", levelRoutes);
app.use("/api/v1/location", locationRoutes);
app.use("/api/v1/universityname", uniNameRoutes);
app.use("/api/v1/scholarship", scholarshipRoutes);
app.use("/api/v1/uninametag", uNameTagRoutes);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>welcome to E-commerce</h1>");
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
