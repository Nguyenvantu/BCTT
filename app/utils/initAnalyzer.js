// Code is copied and modified a bit from stackoverflow

let canvas;
let ctx;

let source;
let context;
let analyser;
let fbcArray;
let bars;
let barX;
let barWidth;
let barHeight;
let id;

export function initAnalyzer(audio) {
  context = new AudioContext();
  analyser = context.createAnalyser();
  canvas = document.getElementById('analyser_render');
  ctx = canvas.getContext('2d');
  source = context.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(context.destination);
  frameLooper();
}

export function cancel() {
  // console.log(window);
  clearTimeout(id);
};

export function continu(){
  
  frameLooper();
}

function frameLooper() {
  let canvas2 = document.getElementById('analyser_render_2');
  let ctx2;
  fbcArray = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(fbcArray);
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  // const gradient = ctx.createLinearGradient(0, 0, 0, 512);
  // gradient.addColorStop(0.15, '#114357');
  // gradient.addColorStop(0.3, '#45B39D');
  //gradient.addColorStop(0.3, '#28B463');
  ctx.fillStyle = '#45B39D';
  if (!!canvas2){
    ctx2 = canvas2.getContext('2d');
    ctx2.clearRect(0, 0, canvas.width, canvas.height);
    ctx2.fillStyle = '#45B39D';
  }

  bars = 150;
  for (let i = 0; i < bars; i++) {
    barX = i * 2;
    barWidth = 1;
    barHeight = -(fbcArray[i] / 2);
    // ctx.fillRect( x, y, width, height ) // Explanation of the parameters below
    ctx.fillRect(barX, canvas.height, barWidth, barHeight);
    if (!!ctx2)
      ctx2.fillRect(barX, canvas.height, barWidth, barHeight);
  }
  id = window.setTimeout(() => frameLooper(), 15);
}
