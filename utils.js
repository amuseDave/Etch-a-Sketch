export function drawLine(x, y, ctx) {
  ctx.lineTo(x, y);
  ctx.stroke();
}

export function getCanvasSizeCSSRatio(canvasEl) {
  console.log(canvasEl);

  const { width, height } = window.getComputedStyle(canvasEl);
  return {
    width: 1 / (width.slice(0, -2) / 1000),
    height: 1 / (height.slice(0, -2) / 800),
  };
}

export function initiateCanvasSettings(ctx) {
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 15;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
}
