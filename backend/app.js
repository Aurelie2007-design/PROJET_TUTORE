const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const paiementsRoutes = require("./routes/paiementRoute");
const userRoute = require("./routes/userRoute");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", paiementsRoutes);
app.use("/api", userRoute);

module.exports = app;