import {RecamanSequence} from "./recamansequence.mjs";
import {lerp} from "./utils.mjs";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

let worldWidth = canvas.width;
let worldHeight = canvas.height;
let worldHeight2 = worldHeight / 2;

const updateWorldSettings = () => {
  if (worldHeight !== window.innerHeight || worldWidth !== window.innerWidth) {
    worldWidth = window.innerWidth;
    worldHeight = window.innerHeight;
    worldHeight2 = worldHeight / 2;
    canvas.width = worldWidth;
    canvas.height = worldHeight;
  }
};

updateWorldSettings();

const sequence = new RecamanSequence();
const preSteps = 1
for (let i = 0; i < preSteps; i++) {
  sequence.step();
}

let percent = 0;
let percentIncrement = 0.01;
let prevMax = 1;

const update = () => {

  ctx.clearRect(0, 0, worldWidth, worldHeight);

  ctx.save();

  const scale = worldWidth / (2 + lerp(prevMax, sequence.max, percent) - sequence.min);
  ctx.translate(scale, worldHeight2);
  ctx.scale(scale, scale);
  ctx.lineWidth = 1 / scale;
  sequence.draw(ctx, percent);

  ctx.restore();
  updateWorldSettings();

  percent += percentIncrement;
  if (percent > 1) {
    percent = 0;
    prevMax = sequence.max;
    sequence.step();
    if (percentIncrement >= 0.5)
      percentIncrement = 2;
    else if (percentIncrement < 0.5)
      percentIncrement += 0.001;
  }

  requestAnimationFrame(update);
}

update();
