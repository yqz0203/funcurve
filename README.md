# Funcurve

🚀🚀Using bezier curve to build animation easily.

[![Build Status](https://travis-ci.com/yqz0203/funcurve.svg?branch=master)](https://travis-ci.com/yqz0203/funcurve)

## Usage

### Install

```bash
npm i funcurve
```

or

```bash
yarn add funcurve
```

### Demo

```typescript
import funcurve from 'funcurve';

const fc = funcurve({
  controlPoints: [
    { x: 100, y: 200 },
    { x: 400, y: 500 },
  ],
  onUpdate({ point }) {
    console.log(point.x, point.y);
  },
  onEnd({ point, finished }) {
    console.log(point.x, point.y, finished);
  },
}).start();
```

If you want't stop current running process, call `stop()`, after that `onEnd` callback will be fired with `finished` being `false`.

```typescript
fc.stop();
```

A funcuve instance can call `start` serveral times. Before next process start, previous process will be stopped and call `onEnd` callback immediately.

```typescript
fc.start();

setTimeout(() => {
  fc.start();
}, 500);
```

## API

### `funcurve`

`funcurve(config: FuncurveConfig):IFuncurve` returns a funcure instance.

#### `config`

| key           | type                            | description                                        |
| ------------- | ------------------------------- | -------------------------------------------------- |
| controlPoints | `Point[]`                       | bezier control point array.                        |
| duration      | `number`                        | the duration(ms) of process, default value is 1000 |
| onUpdate      | `UpdateInfo`                    | the callback of each animation frame               |
| onEnd         | `UpdateInfo&{finished:boolean}` | the callback of the end of process                 |

```typescript
export interface Point {
  x: number;
  y: number;
}

interface UpdateInfo {
  point: Point;
  progress: number;
}

export interface FuncurveConfig {
  controlPoints: Point[];
  duration?: number;
  onUpdate?(res: UpdateInfo): void;
  onEnd?(res: UpdateInfo & { finished?: boolean }): void;
}
```

#### `UpdateInfo`

| key      | type      | description                                                                                 |
| -------- | --------- | ------------------------------------------------------------------------------------------- |
| point    | `Point`   | current point of curve.                                                                     |
| progress | `number`  | current progress. 0 - 1                                                                     |
| finished | `boolean` | `onEnd` callback has an extra `finished` prop to indicate whether the process has finished. |

### `IFuncurve`

### `start()`

Stop previous process and Start a new process.

### `stop()`

Stop current process.

## Principle

See [Realize bezier curve](https://yqz0203.github.io/realize-bezier/)

### License

[MIT](LICENSE)
