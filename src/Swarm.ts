import { Point } from "./Point";
import { getDistance, Randomizer, getTheta } from "./Utils";

export class Swarm {
  nPoints: number;
  dots: boolean = false;
  private Points: Point[] = [];
  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  constructor(
    nPoints: number,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) {
    this.nPoints = nPoints;
    this.ctx = ctx;
    this.canvas = canvas;
    this.addPoint(nPoints);
  }

  private draw(x1: number, y1: number, x2: number, y2: number): void {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.strokeStyle = "#8377D1";
    this.ctx.stroke();
  }

  // TODO: animate line draw
  private drawLine(x1: number, y1: number, x2: number, y2: number): void {
    if (this.dots) {
      const distance = getDistance(x1, y1, x2, y2);
      // const theta = getTheta(x1, y1, x2, y2) + Math.PI; // * Draw in opposite direction
      const theta = getTheta(x1, y1, x2, y2);
      // this.ctx.moveTo(x1, y1);
      for (let i = 0; i < distance; i++) {
        if (i % 30 === 0) {
          // this.ctx.lineTo(x1 + i * Math.cos(theta), y1 + i * Math.sin(theta));
          // this.ctx.strokeStyle = "#8377D1";
          // this.ctx.stroke();
          this.ctx.beginPath();
          this.ctx.arc(
            x1 + i * Math.cos(theta),
            y1 + i * Math.sin(theta),
            1,
            0,
            Math.PI * 2
          );
          this.ctx.fillStyle = "#8377D1";
          this.ctx.fill();
        }
      }
    } else {
      this.draw(x1, y1, x2, y2);
    }
  }

  private async adjustPoint(): Promise<void> {
    if (this.nPoints < this.Points.length) {
      const rmNum = this.Points.length - this.nPoints;
      this.Points.splice(this.nPoints, rmNum);
    }

    if (this.nPoints > this.Points.length) {
      const addNum = this.nPoints - this.Points.length;
      this.addPoint(addNum);
    }
  }

  private addPoint(nPoints: number): void {
    const gutter = 50;
    for (let i = 0; i < nPoints; i++) {
      const x = Randomizer(this.canvas.width - gutter, 0 + gutter);
      const y = Randomizer(this.canvas.height - gutter, 0 + gutter);
      this.Points.push(new Point(x, y, this.ctx));
    }
  }

  async update(): Promise<void> {
    await this.adjustPoint();
    this.Points.forEach((point) => {
      this.Points.forEach((point2) => {
        if (getDistance(point.x, point.y, point2.x, point2.y) < 150) {
          // this.draw(point.x, point.y, point2.x, point2.y);
          this.drawLine(point.x, point.y, point2.x, point2.y);
        }
      });
      point.update();
    });
  }
}
