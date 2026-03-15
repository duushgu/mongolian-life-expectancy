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

const diff = men.map((point, index) => ({
  x: point.x,
  y: women[index].y - point.y
}));

const ctx = document.getElementById("lifeChart");
const themeToggle = document.querySelector(".theme-toggle");
const animateButton = document.querySelector(".animate-button");

const readCssVar = (name) =>
  getComputedStyle(document.body).getPropertyValue(name).trim();

const getThemeColors = () => ({
  accent: readCssVar("--accent"),
  accent2: readCssVar("--accent-2"),
  diff: readCssVar("--diff"),
  grid: readCssVar("--grid"),
  axis: readCssVar("--axis"),
  tooltipBg: readCssVar("--tooltip-bg"),
  tooltipBorder: readCssVar("--tooltip-border"),
  tooltipTitle: readCssVar("--tooltip-title"),
  tooltipBody: readCssVar("--tooltip-body")
});

const chart = new Chart(ctx, {
  type: "line",
  data: {
    datasets: [
      {
        label: "Männer",
        data: men,
        borderColor: "#69a7ff",
        backgroundColor: "rgba(105, 167, 255, 0.16)",
        borderWidth: 3,
        pointRadius: 3,
        pointHoverRadius: 5,
        tension: 0.3
      },
      {
        label: "Frauen",
        data: women,
        borderColor: "#f07fa1",
        backgroundColor: "rgba(240, 127, 161, 0.16)",
        borderWidth: 3,
        pointRadius: 3,
        pointHoverRadius: 5,
        tension: 0.3
      },
      {
        label: "Differenz",
        data: diff,
        borderColor: "#9aa0aa",
        backgroundColor: "rgba(154, 160, 170, 0.12)",
        borderWidth: 2,
        borderDash: [6, 4],
        pointRadius: 2.5,
        pointHoverRadius: 4,
        tension: 0.3,
        yAxisID: "y2"
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    color: "#c9ced9",
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
          padding: 18,
          color: "#c9ced9"
        }
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(20, 24, 33, 0.95)",
        titleColor: "#f4f6fb",
        bodyColor: "#d7dbe5",
        borderColor: "rgba(140, 150, 165, 0.4)",
        borderWidth: 1,
        callbacks: {
          title: (items) => {
            if (!items.length) {
              return "";
            }
            const xValue = items[0].parsed.x;
            if (typeof xValue === "number" && Number.isFinite(xValue)) {
              return Math.round(xValue).toString();
            }
            return String(xValue).replace(/[^\d]/g, "");
          },
          label: (context) => {
            const value = context.parsed.y;
            const formatted = value.toLocaleString("de-DE", {
              maximumFractionDigits: 2
            });
            const unit =
              context.dataset.label === "Differenz" ? " Jahre Differenz" : " Jahre";
            return `${context.dataset.label}: ${formatted}${unit}`;
          }
        }
      }
    },
    scales: {
      x: {
        type: "linear",
        title: {
          display: true,
          text: "Jahr",
          color: "#c9ced9"
        },
        ticks: {
          stepSize: 5,
          callback: (value) => {
            const numeric =
              typeof value === "number"
                ? value
                : Number(String(value).replace(/[^\d.-]/g, ""));
            if (Number.isFinite(numeric)) {
              return Math.round(numeric).toString();
            }
            return String(value).replace(/[^\d]/g, "");
          },
          color: "#c0c6d3"
        },
        grid: {
          color: "rgba(200, 206, 217, 0.08)"
        }
      },
      y: {
        title: {
          display: true,
          text: "Lebenserwartung (Jahre)",
          color: "#c9ced9"
        },
        min: 0,
        suggestedMax: 80,
        ticks: {
          color: "#c0c6d3"
        },
        grid: {
          color: "rgba(200, 206, 217, 0.08)"
        }
      },
      y2: {
        position: "right",
        title: {
          display: true,
          text: "Differenz (Jahre)",
          color: "#c9ced9"
        },
        min: 0,
        suggestedMax: 12,
        ticks: {
          color: "#c0c6d3"
        },
        grid: {
          drawOnChartArea: false
        }
      }
    }
  }
});
chart.options.animation = false;

const totalDuration = 2200;
const maxPoints = Math.max(men.length, women.length, diff.length);
const delayBetweenPoints = totalDuration / maxPoints;
const growthAnimation = {
  x: {
    type: "number",
    easing: "linear",
    duration: delayBetweenPoints,
    from: NaN,
    delay(context) {
      if (context.type !== "data") {
        return 0;
      }
      if (context.xStarted) {
        return 0;
      }
      context.xStarted = true;
      return context.index * delayBetweenPoints;
    }
  },
  y: {
    type: "number",
    easing: "linear",
    duration: delayBetweenPoints,
    from(context) {
      if (context.index === 0) {
        return context.chart.scales.y.getPixelForValue(context.dataset.data[0].y);
      }
      const meta = context.chart.getDatasetMeta(context.datasetIndex);
      return meta.data[context.index - 1].getProps(["y"], true).y;
    },
    delay(context) {
      if (context.type !== "data") {
        return 0;
      }
      if (context.yStarted) {
        return 0;
      }
      context.yStarted = true;
      return context.index * delayBetweenPoints;
    }
  }
};

let animationTimeout = null;
const playGrowthAnimation = () => {
  chart.options.animation = growthAnimation;
  chart.reset();
  chart.update();
  if (animationTimeout) {
    clearTimeout(animationTimeout);
  }
  animationTimeout = setTimeout(() => {
    chart.options.animation = false;
  }, totalDuration + 100);
};

const applyChartTheme = () => {
  const theme = getThemeColors();
  chart.data.datasets[0].borderColor = theme.accent;
  chart.data.datasets[0].backgroundColor = `${theme.accent}29`;
  chart.data.datasets[1].borderColor = theme.accent2;
  chart.data.datasets[1].backgroundColor = `${theme.accent2}29`;
  chart.data.datasets[2].borderColor = theme.diff;
  chart.data.datasets[2].backgroundColor = `${theme.diff}1f`;

  chart.options.color = theme.axis;
  chart.options.plugins.legend.labels.color = theme.axis;
  chart.options.plugins.tooltip.backgroundColor = theme.tooltipBg;
  chart.options.plugins.tooltip.titleColor = theme.tooltipTitle;
  chart.options.plugins.tooltip.bodyColor = theme.tooltipBody;
  chart.options.plugins.tooltip.borderColor = theme.tooltipBorder;

  chart.options.scales.x.title.color = theme.axis;
  chart.options.scales.x.ticks.color = theme.axis;
  chart.options.scales.x.grid.color = theme.grid;
  chart.options.scales.y.title.color = theme.axis;
  chart.options.scales.y.ticks.color = theme.axis;
  chart.options.scales.y.grid.color = theme.grid;
  chart.options.scales.y2.title.color = theme.axis;
  chart.options.scales.y2.ticks.color = theme.axis;

  chart.update();
};

const setTheme = (theme) => {
  document.body.setAttribute("data-theme", theme);
  applyChartTheme();
  localStorage.setItem("theme", theme);
};

const storedTheme = localStorage.getItem("theme");
setTheme(storedTheme === "light" ? "light" : "dark");

themeToggle.addEventListener("click", () => {
  const current = document.body.getAttribute("data-theme") || "dark";
  setTheme(current === "dark" ? "light" : "dark");
});

animateButton.addEventListener("click", playGrowthAnimation);
