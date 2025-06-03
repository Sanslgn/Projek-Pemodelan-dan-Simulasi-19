// Ambil elemen form
const form = document.getElementById("simulasiForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Ambil input pengguna
  const pendudukAwal = Number(document.getElementById("pendudukAwal").value);
  const kelahiran = Number(document.getElementById("kelahiran").value) / 100;
  const kematian = Number(document.getElementById("kematian").value) / 100;
  const imigrasi = Number(document.getElementById("imigrasi").value) / 100;
  const emigrasi = Number(document.getElementById("emigrasi").value) / 100;
  const sampahPerKapita = Number(document.getElementById("sampahPerKapita").value);
  const kepadatan = Number(document.getElementById("kepadatan").value);
  const tinggiTPA = Number(document.getElementById("tinggiTPA").value);
  const luasAwalTPA = Number(document.getElementById("luasAwalTPA").value);
  const tahunAwal = Number(document.getElementById("tahunAwal").value);
  const tahunAkhir = Number(document.getElementById("tahunAkhir").value);

  const tahun = [];
  const jumlahPenduduk = [];
  const volumeSampah = [];
  const luasTPATersisa = [];

  let penduduk = pendudukAwal;
  let luasTPA = luasAwalTPA;

  for (let t = tahunAwal; t <= tahunAkhir; t++) {
    tahun.push(t);
    jumlahPenduduk.push(Math.round(penduduk));

    // Volume sampah per tahun (kg)
    const sampahTahunan = penduduk * sampahPerKapita * 365;
    volumeSampah.push(Math.round(sampahTahunan));

    // Volume sampah (m³)
    const volumeSampahM3 = sampahTahunan / kepadatan;

    // Luas yang dibutuhkan tahun ini
    const luasDibutuhkan = volumeSampahM3 / tinggiTPA;

    // Update luas TPA tersisa
    luasTPA -= luasDibutuhkan;
    luasTPATersisa.push(luasTPA > 0 ? luasTPA : 0);

    // Update penduduk
    penduduk += penduduk * (kelahiran - kematian + imigrasi - emigrasi);
  }

  // Tampilkan alert
  const alertBox = document.getElementById("customAlert");
  alertBox.style.display = "block";
  setTimeout(() => {
    alertBox.style.display = "none";
  }, 4000);

  // Tampilkan grafik
  tampilkanChart("chartPenduduk", "Jumlah Penduduk", tahun, jumlahPenduduk, "#0ea5e9");
  tampilkanChart("chartSampah", "Volume Sampah (kg)", tahun, volumeSampah, "#f97316");
  tampilkanGrafikLuasTPA(tahun, luasTPATersisa);
});

// Fungsi untuk grafik umum
function tampilkanChart(id, label, labels, data, color) {
  const ctx = document.getElementById(id).getContext("2d");
  if (window[id]) window[id].destroy();

  window[id] = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label,
        data,
        borderColor: color,
        backgroundColor: 'transparent',
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: label,
          font: { size: 16 }
        },
        legend: {
          display: true
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Tahun"
          }
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Nilai"
          }
        }
      }
    }
  });
}

// Grafik luas TPA (hektar)
function tampilkanGrafikLuasTPA(tahun, luasTPATersisa) {
  const ctx = document.getElementById("chartTPA").getContext("2d");
  const dataHektar = luasTPATersisa.map(luas => +(luas / 10000).toFixed(2));

  if (window.chartTPA) window.chartTPA.destroy();

  window.chartTPA = new Chart(ctx, {
    type: "line",
    data: {
      labels: tahun,
      datasets: [{
        label: "Estimasi Luas TPA (hektar)",
        data: dataHektar,
        borderColor: "#16a34a",
        backgroundColor: "rgba(22, 163, 74, 0.3)",
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Grafik Estimasi Luas TPA Kota Binjai (hektar)",
          font: {
            size: 16
          }
        },
        legend: {
          display: true
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Tahun"
          }
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Luas (hektar)"
          }
        }
      }
    }
  });
}
