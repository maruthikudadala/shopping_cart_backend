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

const allowedOrigins = [
  "http://localhost:3000",
  "https://shopping-cart-frontend-lime.vercel.app",
  "https://shopping-cart-frontend-git-main-maruthis-projects-1a5f07a5.vercel.app"
];

// ✅ CORS (ENOUGH — handles OPTIONS automatically)
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Postman / curl

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(null, false);
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
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
