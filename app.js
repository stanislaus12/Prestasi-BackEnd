const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const prestasiRoutes = require("./routes/prestasi");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/prestasi", prestasiRoutes);

app.get("/", (req, res) => {
  res.send("Server Prestasi Berjalan Percobaan!");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
