const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Import route prestasi
const prestasiRoutes = require("./routes/prestasi");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Gunakan route prestasi
app.use("/prestasi", prestasiRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("Server Prestasi berjalan ya!");
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
