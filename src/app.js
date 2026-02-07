require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const itemRoutes = require("./routes/itemRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

// CONNECT DB
connectDB();

// 🔥 CORS MUST COME BEFORE ROUTES
// app.use(cors({
//   origin: "http://localhost:3000"
// }));

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://your-frontend.vercel.app" 
  ]
}));

app.use(express.json());

// ROUTES
app.use(userRoutes);
app.use(itemRoutes);
app.use(cartRoutes);
app.use(orderRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

