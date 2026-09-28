const express = require("express"); // impor express
const app = express(); // instansiasi
const PORT = process.env.PORT || 3000; // PORT yang akan digunakan

// Middleware agar req.body (JSON) dapat dibaca
app.use(express.json());

// Data sementara (disimpan di memori, hilang saat server restart)
let businesses = [
  {
    id: 1,
    namaUsaha: "Anyaman Bambu Sari",
    pemilik: "Sari Wulandari",
    kategori: "kerajinan",
    kota: "Tasikmalaya",
    noHp: "082233445566",
  },
  {
    id: 2,
    namaUsaha: "Keripik Pisang Bu Ani",
    pemilik: "Ani Rahayu",
    kategori: "kuliner",
    kota: "Bandar Lampung",
    noHp: "081298765432",
  },
  {
    id: 3,
    namaUsaha: "Batik Tulis Nusantara",
    pemilik: "Rudi Hartono",
    kategori: "fesyen",
    kota: "Pekalongan",
    noHp: "085612345678",
  },
];
let nextId = 4; // penghitung id untuk data baru

// GET /
app.get("/", (req, res) => {
  res.json({
    nama: "M. Mario Al Zaky",
    nim: "ISI_NPM_KAMU",
    topik: 33,
    endpoints: [
      "GET /businesses",
      "GET /businesses/:id",
      "GET /businesses?kategori=kerajinan",
      "POST /businesses",
      "PUT /businesses/:id",
      "DELETE /businesses/:id",
    ],
  });
});

// Menjalankan aplikasi (khusus non-production, agar bisa berjalan di Vercel)
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () =>
    console.log(`Server berjalan di http://localhost:${PORT}`)
  );
}

module.exports = app;