const men = [
  { x: 1920, y: 24.1 },
  { x: 1930, y: 27.5 },
  { x: 1940, y: 31.8 },
  { x: 1950, y: 39.5 },
  { x: 1960, y: 42.3 },
  { x: 1965, y: 58.2 },
  { x: 1970, y: 59.1 },
  { x: 1975, y: 60.1 },
  { x: 1980, y: 60.7 },
  { x: 1985, y: 61.2 },
  { x: 1990, y: 61.1 },
  { x: 1995, y: 60.2 },
  { x: 2000, y: 60.0 },
  { x: 2005, y: 62.1 },
  { x: 2010, y: 64.9 },
  { x: 2015, y: 65.8 },
  { x: 2020, y: 66.7 },
  { x: 2025, y: 68.2 }
];

const women = [
  { x: 1920, y: 25.4 },
  { x: 1930, y: 29.2 },
  { x: 1940, y: 33.9 },
  { x: 1950, y: 42.4 },
  { x: 1960, y: 46.8 },
  { x: 1965, y: 61.9 },
  { x: 1970, y: 63.3 },
  { x: 1975, y: 64.7 },
  { x: 1980, y: 65.5 },
  { x: 1985, y: 66.0 },
  { x: 1990, y: 65.9 },
  { x: 1995, y: 66.1 },
  { x: 2000, y: 66.7 },
  { x: 2005, y: 69.1 },
  { x: 2010, y: 74.3 },
  { x: 2015, y: 75.8 },
  { x: 2020, y: 76.2 },
  { x: 2025, y: 77.4 }
];

const ctx = document.getElementById("lifeChart");

const chart = new Chart(ctx, {
  type: "line",
  data: {
    datasets: [
      {
        label: "Men",
        data: men,
        borderColor: "#2a6fdb",
        backgroundColor: "rgba(42, 111, 219, 0.12)",
        borderWidth: 3,
        pointRadius: 3,
        pointHoverRadius: 5,
        tension: 0.3
      },
      {
        label: "Women",
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
          label: (context) => `${context.dataset.label}: ${context.parsed.y} years`
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
          stepSize: 5
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
        suggestedMin: 20,
        suggestedMax: 80,
        grid: {
          color: "rgba(28, 27, 25, 0.08)"
        }
      }
    }
  }
});
