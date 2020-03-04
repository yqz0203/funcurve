# Funcurve

简单，方便地使用贝塞尔曲线实现曲线动画效果。

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

## API

### `funcurve`

`funcurve(config: FuncurveConfig):IFuncurve` 返回一个实例

#### `config`

| 属性          | 类型                            | 说明               |
| ------------- | ------------------------------- | ------------------ |
| controlPoints | `Point[]`                       | 贝塞尔控制点数组   |
| duration      | `number`                        | 曲线画时间         |
| onUpdate      | `UpdateInfo`                    | 每一帧更新时的回调 |
| onEnd         | `UpdateInfo&{finished:boolean}` | 动画结束时的回调   |

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

| 属性     | 类型      | 描述                                                       |
| -------- | --------- | ---------------------------------------------------------- |
| point    | `Point`   | 当前坐标点                                                 |
| progress | `number`  | 当前进度. 0 - 1                                            |
| finished | `boolean` | `onEnd` 回调有一个额外的 `finished` 属性来判断是否绘制完成 |

### `IFuncurve`

#### `start()`

停止上一次处理并开始一个新的。

#### `stop()`

停止上一次处理。

## 原理

请查看：[理解贝塞尔曲线](https://yqz0203.github.io/realize-bezier/)

### License

[MIT](LICENSE)
