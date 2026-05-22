const express = require("express");
const cors = require("cors");

const driversRoutes = require("./routes/drivers.routes");
const vehiclesRoutes = require("./routes/vehicles.routes");
const tripsRoutes = require("./routes/trips.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/drivers", driversRoutes);
app.use("/vehicles", vehiclesRoutes);
app.use("/trips", tripsRoutes);

module.exports = app;
