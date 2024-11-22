
interface Circle {
  kind: 'circle',
  radius: number;
}

interface Rectangle {
  kind: 'rectangle',
  width: number;
  length: number;
}

type Shape = Circle | Rectangle;

describe("类型推断", function () {
  test("联合类型推断", function () {

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

  test("类型断言", function() {
    function calculateArea(shape: Shape) {
      return Math.PI * Math.pow((shape as Circle).radius, 2);
    }

    const circle: Circle = { radius: 1, kind: 'circle' };
    expect(calculateArea(circle)).toEqual(Math.PI);
  });

  test("类型推断和泛型", function() {
    function identity<T>(value: T): T {
      return value;
    }
    expect(typeof identity("Hello") === 'string').toBeTruthy();
  });
});