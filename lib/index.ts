import { Point, FuncurveConfig, FuncurveInstance } from '..';

const raf =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  (fn => {
    window.setTimeout(fn, 16);
  });

function getBezierPoint(points: Point[], t: number): Point {
  const l = points.length;
  if (l > 1) {
    const nextPoints = [];
    for (let i = 0; i < l - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      nextPoints.push(getNewPoint(p1, p2, t));
    }
    return getBezierPoint(nextPoints, t);
  }

  const point = points[0];
  return point;
}

function getNewPoint(p1: Point, p2: Point, t: number) {
  const x = p1.x + (p2.x - p1.x) * t;
  const y = p1.y + (p2.y - p1.y) * t;
  return new ControlPoint(x, y);
}

const noop = () => {};

class Funcurve implements FuncurveInstance {
  constructor(private config: FuncurveConfig) {
    this.runningIndex = 0;
    this.startTime = 0;
    this.running = false;
  }

  runningIndex: number;
  startTime: number;
  running: boolean;

  private getRunningStatus() {
    const { controlPoints, duration = 1000 } = this.config;
    const t = Date.now() - this.startTime;
    const point = getBezierPoint(controlPoints, Math.min(t / duration, 1));
    return { point, finished: t >= duration };
  }

  start() {
    const { onUpdate = noop, onEnd = noop } = this.config;

    // stop prev
    this.stop();

    const startTime = Date.now();
    this.startTime = startTime;
    const rununingIndex = ++this.runningIndex;
    this.running = true;

    const frame = () =>
      raf(() => {
        if (this.runningIndex !== rununingIndex || this.running === false) {
          return;
        }

        const { point, finished } = this.getRunningStatus();

        if (finished) {
          onUpdate({ point });
          onEnd({ point, finished });
          this.running = false;
          return;
        }
        onUpdate({ point });
        frame();
      });

    frame();

    return this;
  }

  stop() {
    if (this.running === true) {
      const { onEnd = noop } = this.config;
      onEnd(this.getRunningStatus());
    }

    this.running = false;
    return this;
  }
}

class ControlPoint implements Point {
  constructor(public x: number, public y: number) {}
}

export default function funcurve(config: FuncurveConfig): FuncurveInstance {
  return new Funcurve(config);
}
