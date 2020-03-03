import funcurve from '../lib/index';

it('should finish', done => {
  let updateCount = 0;
  const f = funcurve({
    duration: 1000,
    controlPoints: [
      { x: 100, y: 200 },
      { x: 400, y: 500 },
    ],
    onEnd: ({ point, finished }) => {
      expect(updateCount > 10).toBeTruthy();
      expect(finished).toBeTruthy();
      expect(point).toMatchObject({ x: 400, y: 500 });
      done();
    },
    onUpdate: () => {
      updateCount++;
    },
  }).start();
});

it('should not finish', done => {
  let updateCount = 0;
  const f = funcurve({
    duration: 1000,
    controlPoints: [
      { x: 100, y: 200 },
      { x: 400, y: 500 },
    ],
    onEnd: ({ point, finished }) => {
      expect(updateCount > 10).toBeTruthy();
      expect(finished).toBeFalsy();
      expect(point).not.toMatchObject({ x: 400, y: 500 });
      done();
    },
    onUpdate: () => {
      updateCount++;
    },
  }).start();

  setTimeout(() => {
    f.stop();
  }, 400);
});

it('should restart stop prev', done => {
  let endCount = 0;
  const f = funcurve({
    duration: 1000,
    controlPoints: [
      { x: 100, y: 200 },
      { x: 400, y: 500 },
    ],
    onEnd: ({ point, finished }) => {
      endCount++;
      if (endCount === 1) {
        expect(finished).toBeFalsy();
        expect(point).not.toMatchObject({ x: 400, y: 500 });
      }

      if (endCount === 2) {
        expect(finished).toBeTruthy();
        expect(point).toMatchObject({ x: 400, y: 500 });
        done();
      }
    },
  });

  f.start();

  setTimeout(() => {
    f.start();
  }, 200);
});

it('should restart not trigger prev onend callback when prev has been finished', done => {
  let endCount = 0;
  const f = funcurve({
    duration: 1000,
    controlPoints: [
      { x: 100, y: 200 },
      { x: 400, y: 500 },
    ],
    onEnd: ({ point, finished }) => {
      endCount++;
      if (endCount === 1) {
        expect(finished).toBeTruthy();
        expect(point).toMatchObject({ x: 400, y: 500 });
      }

      if (endCount === 2) {
        expect(finished).toBeTruthy();
        expect(point).toMatchObject({ x: 400, y: 500 });
        done();
      }
    },
  });

  f.start();

  setTimeout(() => {
    f.start();
  }, 1200);
});
