
interface Circle {
  kind: 'circle',
  radius: number;
}

interface Rectangle {
  kind: 'rectangle',
  width: number;
  length: number;
}

describe("类型守卫", function() {
  test("使用自定义谓词函数类型守卫", function() {
    type Shape = Circle | Rectangle; // 联合类型

    // 类型谓词 shape is Circle
    function isCircle(shape: Shape): shape is Circle { 
      return shape.kind === 'circle';
    }

    function calculateArea(shape: Shape) {
      if (isCircle(shape)) {
        return Math.PI * Math.pow(shape.radius, 2);
      }
      return shape.width * shape.length;
    }

    const circle: Circle = { radius: 1, kind: 'circle' };
    expect(calculateArea(circle)).toEqual(Math.PI);
  });
});