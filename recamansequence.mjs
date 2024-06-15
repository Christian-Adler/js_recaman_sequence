import {lerp} from "./utils.mjs";

class RecamanSequence {
  constructor() {
    this.counter = 0;
    this.actPos = 0;
    this.visitedNumbers = new Set();
    this.sequence = [];
    this.min = 0;
    this.max = 0;
  }

  step() {
    this.counter++;
    let nextStep = this.actPos - this.counter;
    if (nextStep <= 0 || this.visitedNumbers.has(nextStep))
      nextStep = this.actPos + this.counter;

    this.visitedNumbers.add(nextStep);
    this.actPos = nextStep;
    this.sequence.push(new SequenceItem(this.counter, nextStep));

    if (nextStep > this.max)
      this.max = nextStep;
    else if (nextStep < this.min)
      this.min = nextStep;
  }

  draw(ctx, percent) {
    let prevNumber = 0;
    let item;
    let drawAbove = true;
    for (let i = 0; i < this.sequence.length - 1; i++) {
      item = this.sequence[i];
      this.drawSequenceItem(item, prevNumber, drawAbove, 1, ctx);
      prevNumber = item.number;

      drawAbove = !drawAbove;
    }

    item = this.sequence[this.sequence.length - 1];
    this.drawSequenceItem(item, prevNumber, drawAbove, percent, ctx);
  }

  drawSequenceItem(item, prevNumber, drawAbove, percent, ctx) {
    const r = item.counter / 2;
    const x1 = prevNumber;
    const x2 = item.number;

    ctx.strokeStyle = 'hsl(' + (r) + ' 100% 50% / ' + (50) + '%)';
    ctx.beginPath();
    if (x2 > x1) {
      if (drawAbove)
        ctx.arc(x1 + r, 0, r, Math.PI, lerp(Math.PI, Math.PI * 2, percent));
      else
        ctx.arc(x1 + r, 0, r, Math.PI, lerp(Math.PI, 0, percent), true);
    } else {
      if (drawAbove)
        ctx.arc(x2 + r, 0, r, Math.PI * 2, lerp(Math.PI * 2, Math.PI, percent), true);
      else
        ctx.arc(x2 + r, 0, r, 0, lerp(0, Math.PI, percent));
    }
    ctx.stroke();
  }
}

class SequenceItem {
  constructor(counter, number) {
    this.counter = counter;
    this.number = number;
  }
}

export {RecamanSequence, SequenceItem};