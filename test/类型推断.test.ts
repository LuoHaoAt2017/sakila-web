
describe("类型推断", function () {
  test("联合类型推断", function () {
    interface Circle {
      kind: 'circle',
      radius: number;
    }

    interface Rectangle {
      kind: 'rectangle',
      width: number;
      length: number;
    }

    const circle: Circle = {
      radius: 4,
      kind: 'circle',
    }

    const rectangle: Rectangle = {
      kind: 'rectangle',
      length: 2,
      width: 3
    }
    const shapes = [circle, rectangle];
    type Shape = Circle | Rectangle;

    function sumAreas(shapes: Shape[]) {
      return shapes.map(item => {
        if (item.kind === 'circle') {
          return Math.PI * Math.pow(item.radius, 2);
        } else {
          return item.width * item.length;
        }
      });
    }

    expect(sumAreas(shapes)).toEqual(Math.PI);
  });
});