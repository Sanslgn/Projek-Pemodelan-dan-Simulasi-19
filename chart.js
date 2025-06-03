// Fungsi utama untuk menampilkan chart generik
function tampilkanChart(id, label, labels, data, color) {
  const ctx = document.getElementById(id).getContext("2d");
  if (window[id]) window[id].destroy(); // Hapus chart lama jika ada

  window[id] = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label,
        data,
        borderColor: color,
        backgroundColor: 'transparent', // Transparansi untuk area chart
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true },
        title: {
          display: true,
          text: label,
          font: { size: 16 }
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

// Khusus grafik Luas TPA dalam hektar (turunan dari data m²)
function tampilkanGrafikLuasTPA(tahun, luasTPATersisa) {
  const ctx = document.getElementById("grafikLuasTPA").getContext("2d");

  // Konversi m² ke hektar
  const dataHektar = luasTPATersisa.map(luas => +(luas / 10000).toFixed(2));

  if (window.grafikLuasTPA) window.grafikLuasTPA.destroy();

  window.grafikLuasTPA = new Chart(ctx, {
    type: "line",
    data: {
      labels: tahun,
      datasets: [{
        label: "Estimasi Luas TPA (hektar)",
        data: dataHektar,
        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.3)",
        fill: true,
        tension: 0.3,
        pointRadius: 4,
        pointBackgroundColor: "#1e3a8a"
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Grafik Estimasi Luas TPA Kabupaten Donggala (dalam hektar)",
          font: {
            size: 18
          }
        },
        legend: {
          display: true,
          position: "top"
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
          title: {
            display: true,
            text: "Luas (hektar)"
          },
          beginAtZero: true
        }
      }
    }
  });
}
