const men = [
  { x: 1920, y: 24.1 },
  { x: 1930, y: 27.2 },
  { x: 1940, y: 31.5 },
  { x: 1950, y: 37.8 },
  { x: 1960, y: 43.4 },
  { x: 1965, y: 58.1 },
  { x: 1970, y: 58.8 },
  { x: 1975, y: 59.5 },
  { x: 1980, y: 60.3 },
  { x: 1985, y: 60.9 },
  { x: 1990, y: 60.7 },
  { x: 1995, y: 60.2 },
  { x: 2000, y: 59.9 },
  { x: 2005, y: 62.3 },
  { x: 2010, y: 64.1 },
  { x: 2015, y: 65.9 },
  { x: 2018, y: 66.11 },
  { x: 2021, y: 66.9 },
  { x: 2024, y: 67.9 },
  { x: 2025, y: 68.3 }
];

const women = [
  { x: 1920, y: 25.4 },
  { x: 1930, y: 28.9 },
  { x: 1940, y: 33.7 },
  { x: 1950, y: 41.4 },
  { x: 1960, y: 47.1 },
  { x: 1965, y: 61.8 },
  { x: 1970, y: 63.1 },
  { x: 1975, y: 64.4 },
  { x: 1980, y: 65.3 },
  { x: 1985, y: 66.2 },
  { x: 1990, y: 65.8 },
  { x: 1995, y: 66.5 },
  { x: 2000, y: 66.7 },
  { x: 2005, y: 69.5 },
  { x: 2010, y: 72.5 },
  { x: 2015, y: 75.5 },
  { x: 2018, y: 75.78 },
  { x: 2021, y: 75.3 },
  { x: 2024, y: 77.1 },
  { x: 2025, y: 77.5 }
];

const ctx = document.getElementById("lifeChart");

const chart = new Chart(ctx, {
  type: "line",
  data: {
    datasets: [
      {
        label: "Männer",
        data: men,
        borderColor: "#2a6fdb",
        backgroundColor: "rgba(42, 111, 219, 0.12)",
        borderWidth: 3,
        pointRadius: 3,
        pointHoverRadius: 5,
        tension: 0.3
      },
      {
        label: "Frauen",
        data: women,
        borderColor: "#d4476f",
        backgroundColor: "rgba(212, 71, 111, 0.12)",
        borderWidth: 3,
        pointRadius: 3,
        pointHoverRadius: 5,
        tension: 0.3
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          usePointStyle: true,
          padding: 18
        }
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => {
            const value = context.parsed.y;
            const formatted = value.toLocaleString("de-DE", {
              maximumFractionDigits: 2
            });
            return `${context.dataset.label}: ${formatted} Jahre`;
          }
        }
      }
    },
    scales: {
      x: {
        type: "linear",
        title: {
          display: true,
          text: "Jahr"
        },
        ticks: {
          stepSize: 5,
          callback: (value) => {
            if (typeof value === "number" && Number.isFinite(value)) {
              return Math.round(value).toString();
            }
            return String(value).replace(/[^\d]/g, "");
          }
        },
        grid: {
          color: "rgba(28, 27, 25, 0.06)"
        }
      },
      y: {
        title: {
          display: true,
          text: "Lebenserwartung (Jahre)"
        },
        min: 0,
        suggestedMax: 80,
        grid: {
          color: "rgba(28, 27, 25, 0.08)"
        }
      }
    }
  }
});
