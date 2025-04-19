const canvasEl = document.getElementById("canvas");
const ctx = canvasEl.getContext("2d");

function getCanvasSizeCSS() {
  const { width, height } = getComputedStyle(canvasEl);

  return {
    width: 1 / (width.slice(0, -2) / 1000),
    height: 1 / (height.slice(0, -2) / 800),
  };
}

const state = { isClicked: false, ...getCanvasSizeCSS() };

console.log(state);

function handleMouseDown(e) {
  state.isClicked = true;
  ctx.strokeStyle = "blue";
  ctx.beginPath();
  ctx.moveTo(e.offsetX * state.width, e.offsetY * state.height);
  ctx.stroke;
}

function handleMouseUp() {
  state.isClicked = false;
  ctx.end;
}

function handleMouseMove(e) {
  if (!state.isClicked) return;
  console.log(e.offsetY);

  ctx.lineTo(e.offsetX * state.width, e.offsetY * state.height);
  ctx.stroke();
}

canvasEl.addEventListener("mousedown", handleMouseDown);
canvasEl.addEventListener("mouseleave", handleMouseUp);
canvasEl.addEventListener("mouseup", handleMouseUp);
canvasEl.addEventListener("mousemove", handleMouseMove);
