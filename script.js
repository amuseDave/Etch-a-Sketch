import { drawLine, getCanvasSizeCSSRatio, initiateCanvasSettings } from "./utils.js";

const canvasEl = document.getElementById("canvas");
const ctx = canvasEl.getContext("2d");

const canvasSettingsEl = document.getElementById("canvas-settings");

initiateCanvasSettings(ctx);

const state = { isClicked: false, ...getCanvasSizeCSSRatio(canvasEl) };

function handleMouseUp() {
  state.isClicked = false;
  ctx.closePath();
}

function handleMouseDown(e) {
  const { x, y } = { x: e.offsetX * state.width, y: e.offsetY * state.height };

  state.isClicked = true;

  ctx.beginPath();
  ctx.moveTo(x, y);
  drawLine(x, y, ctx);
}

function handleMouseMove(e) {
  if (!state.isClicked) return;
  const { x, y } = { x: e.offsetX * state.width, y: e.offsetY * state.height };
  drawLine(x, y, ctx);
}

canvasEl.addEventListener("mousedown", handleMouseDown);
canvasEl.addEventListener("mouseleave", handleMouseUp);
canvasEl.addEventListener("mouseup", handleMouseUp);
canvasEl.addEventListener("mousemove", handleMouseMove);
