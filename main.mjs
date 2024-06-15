import {RecamanSequence} from "./recamansequence.mjs";

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
sequence.step();
sequence.step();
sequence.step();
sequence.step();
sequence.step();
sequence.step();
sequence.step();
sequence.step();
sequence.step();
sequence.step();
sequence.step();

const update = () => {

  ctx.clearRect(0, 0, worldWidth, worldHeight);

  ctx.save();

  const scale = worldWidth / (2 + sequence.max - sequence.min);
  ctx.translate(scale, worldHeight2);
  ctx.scale(scale, scale);
  ctx.lineWidth = 1 / scale;
  sequence.draw(ctx);

  ctx.restore();
  updateWorldSettings();

  requestAnimationFrame(update);
}

update();
