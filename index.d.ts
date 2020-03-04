interface UpdateInfo {
  point: Point;
  progress: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface FuncurveConfig {
  controlPoints: Point[];
  duration?: number;
  onUpdate?(res: UpdateInfo): void;
  onEnd?(res: UpdateInfo & { finished?: boolean }): void;
}

export interface IFuncurve {
  start(): this;
  stop(): this;
}

export default function funcurve(config: FuncurveConfig): IFuncurve;

export as namespace funcurve;
