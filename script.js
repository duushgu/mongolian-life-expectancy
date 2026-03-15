const years = [
  1920, 1930, 1940, 1950, 1960, 1965, 1970, 1975, 1980,
  1985, 1990, 1995, 2000, 2005, 2010, 2015, 2020, 2025
];

const men = [
  24.1, 27.5, 31.8, 39.5, 42.3, 58.2, 59.1, 60.1, 60.7,
  61.2, 61.1, 60.2, 60.0, 62.1, 64.9, 65.8, 66.7, 68.2
];

const women = [
  25.4, 29.2, 33.9, 42.4, 46.8, 61.9, 63.3, 64.7, 65.5,
  66.0, 65.9, 66.1, 66.7, 69.1, 74.3, 75.8, 76.2, 77.4
];

const ctx = document.getElementById("lifeChart");

const chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: years,
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
        title: {
          display: true,
          text: "Year"
        },
        grid: {
          color: "rgba(28, 27, 25, 0.06)"
        }
      },
      y: {
        title: {
          display: true,
          text: "Life expectancy (years)"
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
