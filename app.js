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

// GET /businesses -> seluruh data, bisa difilter: /businesses?kategori=kerajinan
app.get("/businesses", (req, res) => {
  const { kategori } = req.query;

  if (kategori) {
    const hasil = businesses.filter((b) => b.kategori === kategori);
    return res.status(200).json(hasil);
  }

  res.status(200).json(businesses);
});

// GET /businesses/1 -> menampilkan satu data berdasarkan id
app.get("/businesses/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const data = businesses.find((b) => b.id === id);

  if (!data) {
    return res.status(404).json({
      status: "error",
      message: `Data dengan id ${id} tidak ditemukan`,
      data: null,
    });
  }

  res.status(200).json(data);
});

// POST /businesses
// Body: { "namaUsaha": "Anyaman Bambu Sari", "pemilik": "Sari Wulandari", "kategori": "kerajinan", "kota": "Tasikmalaya", "noHp": "082233445566" }
app.post("/businesses", (req, res) => {
  const { namaUsaha, pemilik, kategori, kota, noHp } = req.body || {};

  // validasi: field wajib kosong -> 400
  if (!namaUsaha || !pemilik || !kategori || !kota) {
    return res.status(400).json({
      status: "error",
      message: "namaUsaha, pemilik, kategori, dan kota wajib diisi",
      data: null,
    });
  }

  const baru = { id: nextId++, namaUsaha, pemilik, kategori, kota, noHp };
  businesses.push(baru);

  res.status(201).json({
    status: "success",
    message: "Data berhasil ditambahkan",
    data: baru,
  });
});

// PUT /businesses/1
// Body: { "namaUsaha": "Anyaman Bambu Sari", "pemilik": "Sari Wulandari", "kategori": "kerajinan", "kota": "Tasikmalaya", "noHp": "082233445566" }
app.put("/businesses/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = businesses.findIndex((b) => b.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: "error",
      message: `Data dengan id ${id} tidak ditemukan`,
      data: null,
    });
  }

  const { namaUsaha, pemilik, kategori, kota, noHp } = req.body || {};

  if (!namaUsaha || !pemilik || !kategori || !kota) {
    return res.status(400).json({
      status: "error",
      message: "namaUsaha, pemilik, kategori, dan kota wajib diisi",
      data: null,
    });
  }

  businesses[index] = { id, namaUsaha, pemilik, kategori, kota, noHp };

  res.status(200).json({
    status: "success",
    message: `Data usaha dengan id ${id} berhasil diubah`,
    data: businesses[index],
  });
});

// Menjalankan aplikasi (khusus non-production, agar bisa berjalan di Vercel)
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () =>
    console.log(`Server berjalan di http://localhost:${PORT}`)
  );
}

module.exports = app;