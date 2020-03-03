# Funcurve

🚀🚀Using bezier curve to build animation easily.

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

A funcuve instance can call `start` serveral times. Before next process start, prev process will be stopped and call `onEnd` callback immediately.

```typescript
fc.start();

setTimeout(() => {
  fc.start();
}, 500);
```

## Principle

See [Realize bezier curve](https://yqz0203.github.io/realize-bezier/)

### License

[MIT](LICENSE)

