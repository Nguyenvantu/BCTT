let canvas;
let ctx;
let canvas2;
let ctx2;

let source;
let context;
let analyser;
let fbcArray;
const bars = 150;
let barX;
// let barWidth;
let barHeight;

export function initAnalyzer(audio) {
  context = new AudioContext();
  analyser = context.createAnalyser();
  canvas = document.getElementById('analyser_render');
  ctx = canvas.getContext('2d');
  source = context.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(context.destination);
  fbcArray = new Uint8Array(analyser.frequencyBinCount);
  ctx.fillStyle = '#45B39D';
}

export function frameLooper() {
  canvas2 = document.getElementById('analyser_render_2');
  analyser.getByteFrequencyData(fbcArray);
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  // const gradient = ctx.createLinearGradient(0, 0, 0, 512);
  // gradient.addColorStop(0.15, '#114357');
  // gradient.addColorStop(0.3, '#45B39D');
  // gradient.addColorStop(0.3, '#28B463');
  if (!!canvas2){
    ctx2 = canvas2.getContext('2d');
    ctx2.clearRect(0, 0, canvas.width, canvas.height);
    ctx2.fillStyle = '#45B39D';
  }

  for (let i = 0; i < bars; i++) {
    barX = i * 2;
    // barWidth = 1;
    barHeight = -(fbcArray[i] / 2);
    ctx.fillRect(barX, canvas.height, 1, barHeight);
    if (!!ctx2)
      ctx2.fillRect(barX, canvas.height, 1, barHeight);
  }
}
