const Randomizer = (max: number, min: number = 0): number => {
  return Math.floor(Math.random() * (max - min) + min);
};

const RandomPosNeg = (num: number): number => {
  return Math.random() > 0.5 ? num : -num;
};

const getDistance = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number => {
  const xDist = x2 - x1;
  const yDist = y2 - y1;
  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
};

const getTheta = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  degrees: boolean = false
) => {
  let theta = Math.atan2(y2 - y1, x2 - x1);
  if (degrees) (theta * 180) / Math.PI;
  return theta;
};

const setCanvas = (canvas: HTMLCanvasElement): void => {
  if (
    canvas.height !== window.innerHeight ||
    canvas.width !== window.innerWidth
  ) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
};

export { Randomizer, RandomPosNeg, getDistance, getTheta, setCanvas };
