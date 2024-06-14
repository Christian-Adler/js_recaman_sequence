const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

let worldWidth = canvas.width;
let worldHeight = canvas.height;

const updateWorldSettings = () => {
  if (worldHeight !== window.innerHeight || worldWidth !== window.innerWidth) {
    worldWidth = window.innerWidth;
    worldHeight = window.innerHeight;
    canvas.width = worldWidth;
    canvas.height = worldHeight;
  }
};

updateWorldSettings();

const update = () => {

  ctx.clearRect(0, 0, worldWidth, worldHeight);


  updateWorldSettings();

  requestAnimationFrame(update);
}

update();
