# Funcurve

简单，方便地使用贝塞尔曲线实现动画效果。

[![Build Status](https://travis-ci.com/yqz0203/funcurve.svg?branch=master)](https://travis-ci.com/yqz0203/funcurve)

## 使用方法

### 安装

```bash
npm i funcurve
```

或者

```bash
yarn add funcurve
```

### 示例

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

如果想要中断当前的动画进度，可以使用`stop()`方法。使用后`onEnd`回调仍然会触发，但是`finished`为`false`。

```typescript
fc.stop();
```

同一个 funcurve 实例可以多次执行`start`，下一次执行前会中断前一个动画并立刻执行一次`onEnd`回调。

```typescript
fc.start();

setTimeout(() => {
  fc.start();
}, 500);
```

## 原理

请查看：[理解贝塞尔曲线](https://yqz0203.github.io/realize-bezier/)

### License

[MIT](LICENSE)
