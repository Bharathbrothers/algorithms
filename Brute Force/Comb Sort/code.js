import { Array1DTracer, ChartTracer, LogTracer, Randomize } from 'algorithm-visualizer';

const chart = new ChartTracer();
const tracer = new Array1DTracer().chart(chart);
const logger = new LogTracer();
const D = new Randomize.Array1D(15).create();
tracer.set(D).delay();

logger.print(`original array = [${D.join(', ')}]`);
const N = D.length;
let swapped;
let gap = N; // initialize gap size
const shrink = 1.3; // set the gap shrink factor

do {
  // update the gap value for the next comb.
  gap = Math.floor(gap / shrink);
  if (gap < 1) {
    // minimum gap is 1
    gap = 1;
  }

  swapped = false; // initialize swapped
  // a single comb over the input list
  for (let i = 0; i + gap < N; i++) {
    tracer.select(i).select(i + gap).delay();

    if (D[i] > D[i + gap]) {
      logger.print(`swap ${D[i]} and ${D[i + gap]}`); // log swap event

      const temp = D[i];
      D[i] = D[i + gap];
      D[i + gap] = temp;

      tracer.patch(i, D[i]).patch(i + gap, D[i + gap]).delay();
      tracer.depatch(i).depatch(i + gap);

      swapped = true; // Flag swapped has happened and list is not guaranteed sorted
    }
    tracer.deselect(i).deselect(i + gap);
  } // End of combing
} while (gap !== 1 || swapped);
