import {
  drawLine,
  getCanvasSizeCSSRatio,
  getRandomColor,
  initiateCanvasSettings,
} from "./utils.js";

const canvasEl = document.getElementById("canvas");
const ctx = canvasEl.getContext("2d");

const canvasSettingsEl = document.getElementById("canvas-settings");
const clearCanvasBtn = document.getElementById("clear-canvas");
const checkboxEl = document.getElementById("checkbox");
const checkboxInputEl = document.getElementById("checkbox-input");

const softnessEl = document.getElementById("softness");
const softnessInputEl = document.getElementById("softness-input");

initiateCanvasSettings(ctx);

const state = { isClicked: false, ...getCanvasSizeCSSRatio(canvasEl), isRandom: false };

function handleMouseUp() {
  state.isClicked = false;
  ctx.closePath();
}

function handleMouseDown(e) {
  const { x, y } = { x: e.offsetX * state.width, y: e.offsetY * state.height };

  state.isClicked = true;

  if (state.isRandom) ctx.strokeStyle = getRandomColor();
  ctx.beginPath();
  ctx.moveTo(x, y);
  drawLine(x, y, ctx);
}

function handleMouseMove(e) {
  if (!state.isClicked) return;
  if (state.isRandom) ctx.strokeStyle = getRandomColor();
  const { x, y } = { x: e.offsetX * state.width, y: e.offsetY * state.height };
  drawLine(x, y, ctx);
}

canvasEl.addEventListener("mousedown", handleMouseDown);
canvasEl.addEventListener("mouseleave", handleMouseUp);
canvasEl.addEventListener("mouseup", handleMouseUp);
canvasEl.addEventListener("mousemove", handleMouseMove);

// Canvas settings

canvasSettingsEl.addEventListener("change", (e) => {
  const { value, type, id } = e.target;
  if (type === "range") {
    ctx.lineWidth = typeof +value === "number" ? +value : ctx.lineWidth;
  } else if (type === "color") {
    ctx.strokeStyle = value;
  } else if (type === "checkbox") {
    if (id === "checkboxx") {
      checkboxInputEl.checked = !checkboxInputEl.checked;
      state.isRandom = checkboxInputEl.checked;
    } else {
      softnessInputEl.checked = !softnessInputEl.checked;
      state.isRandom = softnessInputEl.checked;
      ctx.globalAlpha = softnessInputEl.checked ? 0.01 : 1;
    }
  }
});

clearCanvasBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, 1000, 800);
});

checkboxEl.addEventListener("click", () => {
  checkboxInputEl.checked = !checkboxInputEl.checked;
  state.isRandom = checkboxInputEl.checked;
});

softnessEl.addEventListener("click", () => {
  softnessInputEl.checked = !softnessInputEl.checked;
  state.isRandom = softnessInputEl.checked;
  ctx.globalAlpha = softnessInputEl.checked ? 0.01 : 1;
});
