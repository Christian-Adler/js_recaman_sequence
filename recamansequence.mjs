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
    let nextStep;
    const negativeStepWouldBe = this.actPos - this.counter;
    if (negativeStepWouldBe > 0 && !this.visitedNumbers.has(negativeStepWouldBe))
      nextStep = negativeStepWouldBe;
    else
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
    // const drawAsCircle = true;
    let prevNumber = 0;
    let item;
    for (let i = 0; i < this.sequence.length - 1; i++) {
      item = this.sequence[i];
      this.drawSequenceItem(item, prevNumber, 1, ctx);
      prevNumber = item.number;
    }

    item = this.sequence[this.sequence.length - 1];
    this.drawSequenceItem(item, prevNumber, percent, ctx);
  }

  drawSequenceItem(item, prevNumber, percent, ctx) {
    const r = item.counter / 2;
    const x1 = prevNumber;
    const x2 = item.number;

    ctx.beginPath();
    // if (drawAsCircle) {
    //   ctx.arc(Math.min(x1, x2) + r, 0, r, 0, Math.PI * 2);
    // } else {
    if (x2 > x1)
      ctx.arc(x1 + r, 0, r, Math.PI, lerp(Math.PI, Math.PI * 2, percent));
    else
      ctx.arc(x2 + r, 0, r, 0, lerp(0, Math.PI, percent));
    // }
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