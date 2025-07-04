// backend/index.js
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./db");
require("dotenv").config();

const app = express();
const PORT = 3001;
const JWT_SECRET =
  process.env.JWT_SECRET ||
  "g$u!P7#z&A5qR*sFv@w9bX!eD^hY@kT*nLcV2mB8jZ%pW6fC#qE$rT&uI"; // Ganti dengan secret key yang lebih aman di file .env Anda

app.use(cors());
app.use(express.json());

// --- ENDPOINT REGISTRASI PENGGUNA BARU ---
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Nama, email, dan password diperlukan" });
  }

  try {
    // Hash password sebelum disimpan
    const hashedPassword = await bcrypt.hash(password, 10);

    const query =
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
    // Pengguna baru defaultnya adalah 'User'
    const [result] = await db.query(query, [
      name,
      email,
      hashedPassword,
      "User",
    ]);

    res
      .status(201)
      .json({ message: "Registrasi berhasil", userId: result.insertId });
  } catch (error) {
    // Cetak error lengkap di terminal untuk kita lihat
    console.error("Gagal melakukan registrasi:", error);

    // Kirim pesan error yang lebih detail ke Postman untuk debugging
    res.status(500).json({
      message: "Terjadi kesalahan pada server saat registrasi.",
      error: error.message, // Ini akan menampilkan pesan error asli dari MySQL
    });
  }
});

// --- ENDPOINT LOGIN ---
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email dan password diperlukan" });
  }

  try {
    const query = "SELECT * FROM users WHERE email = ?";
    const [users] = await db.query(query, [email]);

    if (users.length === 0) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    const user = users[0];
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    // Buat JWT Token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: "24h" } // Token berlaku selama 24 jam
    );

    // Kirim token dan data pengguna (tanpa password) ke frontend
    res.json({
      message: "Login berhasil",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Gagal melakukan login:", error);
    res.status(500).json({ message: "Kesalahan pada server" });
  }
});

// --- [BARU] MIDDLEWARE UNTUK OTENTIKASI ADMIN ---
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Ambil token dari "Bearer <token>"

  if (token == null) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden, token tidak valid
    }

    if (user.role !== "Admin") {
      return res
        .status(403)
        .json({ message: "Akses ditolak: Hanya untuk Admin." });
    }

    req.user = user;
    next(); // Lanjutkan ke handler utama
  });
};

app.use(cors());

app.get("/api/books", async (req, res) => {
  try {
    const query = `
        SELECT
          b.id, b.title, b.author, b.description, b.price, b.stock, b.image_url,
          c.name AS category_name
        FROM books AS b
        JOIN categories AS c ON b.category_id = c.id
      `;
    const [books] = await db.query(query);
    res.json(books);
  } catch (error) {
    console.error("Gagal mengambil data buku:", error);
    res
      .status(500)
      .json({ message: "Kesalahan pada server saat mengambil buku" });
  }
});

// 2. Mengambil SATU buku berdasarkan ID
app.get("/api/books/:id", async (req, res) => {
  /* ... kode untuk detail buku ... */
});

// Endpoint API Buku (tetap sama)
app.post("/api/books", authenticateAdmin, async (req, res) => {
  const { category_id, title, author, description, price, stock, image_url } =
    req.body;

  // Validasi input dasar
  if (!category_id || !title || !author || !price || !stock) {
    return res.status(400).json({ message: "Field wajib tidak boleh kosong" });
  }

  try {
    const query = `
        INSERT INTO books (category_id, title, author, description, price, stock, image_url) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
    const [result] = await db.query(query, [
      category_id,
      title,
      author,
      description,
      price,
      stock,
      image_url || "/placeholder.svg",
    ]);

    res
      .status(201)
      .json({ message: "Buku berhasil ditambahkan", bookId: result.insertId });
  } catch (error) {
    console.error("Gagal menambah buku:", error);
    res.status(500).json({ message: "Kesalahan pada server" });
  }
});
app.put("/api/books/:id", authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  const { category_id, title, author, description, price, stock, image_url } =
    req.body;

  if (!category_id || !title || !author || !price || !stock) {
    return res.status(400).json({ message: "Field wajib tidak boleh kosong" });
  }

  try {
    const query = `
        UPDATE books 
        SET category_id = ?, title = ?, author = ?, description = ?, price = ?, stock = ?, image_url = ? 
        WHERE id = ?
      `;
    const [result] = await db.query(query, [
      category_id,
      title,
      author,
      description,
      price,
      stock,
      image_url,
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Buku tidak ditemukan" });
    }

    res.json({ message: "Buku berhasil diperbarui" });
  } catch (error) {
    console.error("Gagal mengedit buku:", error);
    res.status(500).json({ message: "Kesalahan pada server" });
  }
});

app.delete("/api/books/:id", authenticateAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const query = "DELETE FROM books WHERE id = ?";
    const [result] = await db.query(query, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Buku tidak ditemukan" });
    }

    res.json({ message: "Buku berhasil dihapus" });
  } catch (error) {
    console.error("Gagal menghapus buku:", error);
    res.status(500).json({ message: "Kesalahan pada server" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server backend berjalan di http://localhost:${PORT}`);
});
