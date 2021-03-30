import * as dat from "dat.gui";
const gui = new dat.GUI();

import { Swarm } from "./Swarm";
import { setCanvas } from "./Utils";

const canvas: HTMLCanvasElement = document.querySelector("canvas");
const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

let swarm: Swarm;
let guiProps = { BackgroundColor: "#1C1D21" };
const animate = (): void => {
  setCanvas(canvas);
  requestAnimationFrame(animate);
  ctx.fillStyle = guiProps.BackgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  swarm.update();
};

export const init = (nPoints: number): void => {
  setCanvas(canvas);
  swarm = new Swarm(nPoints, canvas, ctx);
  gui.add(swarm, "nPoints", 0, 200);
  gui.addColor(swarm, "PointColor");
  gui.addColor(swarm, "JoinColor");
  gui.addColor(guiProps, "BackgroundColor");
  gui.add(swarm, "dots");
  animate();
};
