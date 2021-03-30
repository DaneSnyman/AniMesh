import { Randomizer, RandomPosNeg } from "./Utils";

export class Point {
  x: number;
  y: number;
  private r: number;
  private ctx: CanvasRenderingContext2D;
  private speedX: number;
  private speedY: number;

  constructor(
    x: number,
    y: number,
    ctx: CanvasRenderingContext2D,
    r: number = 3
  ) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.ctx = ctx;
    this.speedX = RandomPosNeg(Randomizer(3, 1));
    this.speedY = RandomPosNeg(Randomizer(3, 1));
  }

  private draw(): void {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    this.ctx.fillStyle = "#8377D1";
    this.ctx.fill();
  }

  update(): void {
    if (this.x > window.innerWidth || this.x < 0) this.speedX = -this.speedX;
    if (this.y > window.innerHeight || this.y < 0) this.speedY = -this.speedY;
    this.draw();

    this.x += this.speedX;
    this.y += this.speedY;
  }
}
