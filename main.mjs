import {Sequence} from "./sequence.mjs";
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

const sequenceType = 'recaman'; // recaman,fibonacci
let lineWidth = 10;
const preSteps = 1;
const sequence = new Sequence(sequenceType);
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
  ctx.lineWidth = lineWidth / scale;
  sequence.draw(ctx, percent);

  ctx.restore();
  updateWorldSettings();

  percent += percentIncrement;
  if (percent > 1) {
    percent = 0;
    prevMax = sequence.max;
    sequence.step();

    if (lineWidth > 1)
      lineWidth -= 0.1;

    if (percentIncrement >= 0.5)
      percentIncrement = 2;
    else if (percentIncrement < 0.5)
      percentIncrement += 0.001;
  }

  requestAnimationFrame(update);
}

update();
