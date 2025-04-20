export function drawLine(x, y, ctx) {
  ctx.lineTo(x, y);
  ctx.stroke();
}

export function getCanvasSizeCSSRatio(canvasEl) {
  const { width, height } = window.getComputedStyle(canvasEl);
  return {
    width: 1 / (width.slice(0, -2) / 1000),
    height: 1 / (height.slice(0, -2) / 900),
  };
}

export function initiateCanvasSettings(ctx) {
  ctx.lineWidth = 10;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
}

const colors = [
  "#A3C9F1",
  "#FF6B8E",
  "#4AD8C2",
  "#EFAF33",
  "#7B4CE8",
  "#D192B6",
  "#3FC75A",
  "#F943D0",
  "#86E39A",
  "#C81E4F",
  "#5AB7F0",
  "#FF9C64",
  "#2E8BD4",
  "#B46CF8",
  "#E6D52A",
];
export function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}
