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

const colorEl = document.getElementById("color-el");

initiateCanvasSettings(ctx);

const state = { isClicked: false, ...getCanvasSizeCSSRatio(canvasEl), isRandom: false };

function handleMouseUp() {
  state.isClicked = false;
  ctx.closePath();
}

function handleMouseDown(e, isTouch) {
  let x;
  let y;

  if (isTouch) {
    var bcr = e.target.getBoundingClientRect();
    x = (e.targetTouches[0].clientX - bcr.x) * state.width;
    y = (e.targetTouches[0].clientY - bcr.y) * state.height;
  } else {
    x = e.offsetX * state.width;
    y = e.offsetY * state.height;
  }

  state.isClicked = true;

  if (state.isRandom) ctx.strokeStyle = getRandomColor();
  else ctx.strokeStyle = colorEl.value;
  ctx.beginPath();
  ctx.moveTo(x, y);
  drawLine(x, y, ctx);
}

function handleMouseMove(e, isTouch) {
  if (!state.isClicked) return;

  e.preventDefault();
  if (state.isRandom) ctx.strokeStyle = getRandomColor();

  let x;
  let y;

  if (isTouch) {
    var bcr = e.target.getBoundingClientRect();

    x = (e.targetTouches[0].clientX - bcr.x) * state.width;
    y = (e.targetTouches[0].clientY - bcr.y) * state.height;
  } else {
    x = e.offsetX * state.width;
    y = e.offsetY * state.height;
  }
  drawLine(x, y, ctx);
}

canvasEl.addEventListener("mousedown", handleMouseDown);
canvasEl.addEventListener("mouseleave", handleMouseUp);
canvasEl.addEventListener("mouseup", handleMouseUp);
canvasEl.addEventListener("mousemove", handleMouseMove);

canvasEl.addEventListener("touchstart", (e) => handleMouseDown(e, true));
canvasEl.addEventListener("touchend", handleMouseUp);
canvasEl.addEventListener("touchcancel", handleMouseUp);
canvasEl.addEventListener("touchmove", (e) => handleMouseMove(e, true));

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
  ctx.globalAlpha = softnessInputEl.checked ? 0.01 : 1;
});

window.addEventListener("resize", () => {
  const { width, height } = getCanvasSizeCSSRatio(canvasEl);
  state.width = width;
  state.height = height;
});
