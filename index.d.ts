export interface Point {
  x: number;
  y: number;
}

export interface FuncurveConfig {
  controlPoints: Point[];
  duration?: number;
  onUpdate?(res: { point: Point }): void;
  onEnd?(res: { finished?: boolean; point: Point }): void;
}

export interface FuncurveInstance {
  start(): this;
  stop(): this;
}

export default function funcurve(config: FuncurveConfig): FuncurveInstance;

export as namespace funcurve;
