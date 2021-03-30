import * as dat from "dat.gui";
const gui = new dat.GUI();

import { Swarm } from "./Swarm";
import { setCanvas } from "./Utils";

const canvas: HTMLCanvasElement = document.querySelector("canvas");
const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

let swarm: Swarm;
const animate = (): void => {
  setCanvas(canvas);
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  swarm.update();
};

export const init = (nPoints: number): void => {
  setCanvas(canvas);
  swarm = new Swarm(nPoints, canvas, ctx);
  gui.add(swarm, "nPoints", 0, 200);
  gui.add(swarm, "dots");
  canvas.style.backgroundColor = "#1C1D21";
  animate();
};
