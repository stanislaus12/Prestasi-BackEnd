const db = require("../config/mysql");

exports.getPrestasi = (req, res) => {
  const sql =
    "SELECT * FROM tbl_prestasi WHERE status = 1 ORDER BY id_prestasi DESC";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error executing SQL:", err);
      return res.status(500).json({ message: "Error", error: err });
    }

    if (result.length > 0) {
      return res.status(200).json({ message: "Success", val: result });
    } else {
      return res.status(200).json({ message: "No Data", val: [] });
    }
  });
};

exports.deletePrestasi = (req, res) => {
  const { id_prestasi } = req.body;

  let sql = "UPDATE tbl_prestasi SET status = 0 WHERE id_prestasi = ?";
  db.query(sql, [id_prestasi], function (err, result) {
    if (err) {
      console.error("Error deleting data:", err);
      return res.status(500).json({ message: "Delete Failed" });
    }

    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Delete Success" });
    } else {
      res.status(404).json({ message: "No Data Found" });
    }
  });
};
exports.searchPrestasi = (req, res) => {
  let nama_prestasi = req.body.nama_prestasi;

  let sql =
    "SELECT * FROM tbl_prestasi WHERE nama_prestasi LIKE ? AND status = 1";

  db.query(sql, [`%${nama_prestasi}%`], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Terjadi kesalahan pada server" });
    } else {
      return res
        .status(200)
        .json({ message: "Berhasil Mencari data", val: result });
    }
  });
};

exports.addPrestasi = (req, res) => {
  const {
    nama_prestasi,
    cabang_prestasi,
    tahun_prestasi,
    penyelenggara_prestasi,
  } = req.body;

  if (
    !nama_prestasi ||
    !cabang_prestasi ||
    !tahun_prestasi ||
    !penyelenggara_prestasi
  ) {
    return res.status(400).json({ message: "Lengkapi semua field" });
  }

  const sql =
    "INSERT INTO tbl_prestasi (nama_prestasi, cabang_prestasi, tahun_prestasi, penyelenggara_prestasi, status) VALUES (?, ?, ?, ?, 1)";

  db.query(
    sql,
    [nama_prestasi, cabang_prestasi, tahun_prestasi, penyelenggara_prestasi],
    (err, result) => {
      if (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Error menambahkan data" });
      }
      res.status(201).json({
        message: "Prestasi berhasil ditambahkan",
        id: result.insertId,
      });
    }
  );
};

exports.editPrestasi = (req, res) => {
  const {
    id_prestasi,
    nama_prestasi,
    cabang_prestasi,
    tahun_prestasi,
    penyelenggara_prestasi,
  } = req.body;
  if (
    !id_prestasi ||
    !nama_prestasi ||
    !cabang_prestasi ||
    !tahun_prestasi ||
    !penyelenggara_prestasi
  ) {
    return res.status(400).json({ message: "Lengkapi semua field" });
  }

  const sql = `
    UPDATE tbl_prestasi 
    SET nama_prestasi = ?, cabang_prestasi = ?, tahun_prestasi = ?, penyelenggara_prestasi = ?
    WHERE id_prestasi = ? AND status = 1
  `;

  db.query(
    sql,
    [
      nama_prestasi,
      cabang_prestasi,
      tahun_prestasi,
      penyelenggara_prestasi,
      id_prestasi,
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating data:", err);
        return res.status(500).json({ message: "Update Failed" });
      }

      if (result.affectedRows > 0) {
        return res.status(200).json({ message: "Update Success" });
      } else {
        return res.status(404).json({ message: "Data tidak ditemukan" });
      }
    }
  );
};
