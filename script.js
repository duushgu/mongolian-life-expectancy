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

const colorWithAlpha = (color, alpha) => {
  if (color.startsWith("#")) {
    const hex = color.slice(1);
    const normalized =
      hex.length === 3
        ? hex
            .split("")
            .map((char) => char + char)
            .join("")
        : hex;
    const red = parseInt(normalized.slice(0, 2), 16);
    const green = parseInt(normalized.slice(2, 4), 16);
    const blue = parseInt(normalized.slice(4, 6), 16);
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  }
  const rgbMatch = color.match(/rgba?\(([^)]+)\)/);
  if (rgbMatch) {
    const [red, green, blue] = rgbMatch[1]
      .split(",")
      .slice(0, 3)
      .map((value) => Number(value.trim()));
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  }
  return color;
};

let chart;

const totalDuration = 2200;
const maxPoints = Math.max(men.length, women.length, diff.length);
const delayBetweenPoints = totalDuration / maxPoints;

const buildGrowthAnimation = () => {
  const xStarted = new WeakSet();
  const yStarted = new WeakSet();
  return {
    x: {
      type: "number",
      easing: "linear",
      duration: delayBetweenPoints,
      from: NaN,
      delay(context) {
        if (context.type !== "data") {
          return 0;
        }
        if (xStarted.has(context)) {
          return 0;
        }
        xStarted.add(context);
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
        if (yStarted.has(context)) {
          return 0;
        }
        yStarted.add(context);
        return context.index * delayBetweenPoints;
      }
    }
  };
};

let animationTimeout = null;
const playGrowthAnimation = () => {
  if (animationTimeout) {
    clearTimeout(animationTimeout);
  }
  if (chart) {
    chart.destroy();
  }
  chart = createChart(true);
  animationTimeout = setTimeout(() => {
    if (chart) {
      chart.options.animation = false;
      chart.update();
    }
  }, totalDuration + 100);
};

const applyChartTheme = () => {
  if (!chart) {
    return;
  }
  const theme = getThemeColors();
  chart.data.datasets[0].borderColor = theme.accent;
  chart.data.datasets[0].backgroundColor = colorWithAlpha(theme.accent, 0.16);
  chart.data.datasets[1].borderColor = theme.accent2;
  chart.data.datasets[1].backgroundColor = colorWithAlpha(theme.accent2, 0.16);
  chart.data.datasets[2].borderColor = theme.diff;
  chart.data.datasets[2].backgroundColor = colorWithAlpha(theme.diff, 0.12);

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

const buildChartOptions = (theme, animate) => ({
  responsive: true,
  maintainAspectRatio: false,
  color: theme.axis,
  animation: animate ? buildGrowthAnimation() : false,
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
        color: theme.axis
      }
    },
    tooltip: {
      enabled: true,
      backgroundColor: theme.tooltipBg,
      titleColor: theme.tooltipTitle,
      bodyColor: theme.tooltipBody,
      borderColor: theme.tooltipBorder,
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
        color: theme.axis
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
        color: theme.axis
      },
      grid: {
        color: theme.grid
      }
    },
    y: {
      title: {
        display: true,
        text: "Lebenserwartung (Jahre)",
        color: theme.axis
      },
      min: 0,
      suggestedMax: 80,
      ticks: {
        color: theme.axis
      },
      grid: {
        color: theme.grid
      }
    },
    y2: {
      position: "right",
      title: {
        display: true,
        text: "Differenz (Jahre)",
        color: theme.axis
      },
      min: 0,
      suggestedMax: 12,
      ticks: {
        color: theme.axis
      },
      grid: {
        drawOnChartArea: false
      }
    }
  }
});

const createChart = (animate) => {
  const theme = getThemeColors();
  const datasets = [
    {
      label: "Männer",
      data: men,
      borderColor: theme.accent,
      backgroundColor: colorWithAlpha(theme.accent, 0.16),
      borderWidth: 3,
      pointRadius: 3,
      pointHoverRadius: 5,
      tension: 0.3
    },
    {
      label: "Frauen",
      data: women,
      borderColor: theme.accent2,
      backgroundColor: colorWithAlpha(theme.accent2, 0.16),
      borderWidth: 3,
      pointRadius: 3,
      pointHoverRadius: 5,
      tension: 0.3
    },
    {
      label: "Differenz",
      data: diff,
      borderColor: theme.diff,
      backgroundColor: colorWithAlpha(theme.diff, 0.12),
      borderWidth: 2,
      borderDash: [6, 4],
      pointRadius: 2.5,
      pointHoverRadius: 4,
      tension: 0.3,
      yAxisID: "y2"
    }
  ];
  return new Chart(ctx, {
    type: "line",
    data: { datasets },
    options: buildChartOptions(theme, animate)
  });
};

const storedTheme = localStorage.getItem("theme");
setTheme(storedTheme === "light" ? "light" : "dark");
chart = createChart(false);

themeToggle.addEventListener("click", () => {
  const current = document.body.getAttribute("data-theme") || "dark";
  setTheme(current === "dark" ? "light" : "dark");
});

animateButton.addEventListener("click", playGrowthAnimation);
