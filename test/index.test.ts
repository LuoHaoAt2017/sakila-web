


describe("类型守卫", function () {
  test("使用自定义谓词函数类型守卫", function () {
    interface Circle {
      kind: 'circle',
      radius: number;
    }

    interface Rectangle {
      kind: 'rectangle',
      width: number;
      length: number;
    }

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

  test('使用联合类型守卫', function () {
    interface Car {
      type: 'car'; // 字面量类型
      brand: string;
      wheels: number;
    }

    interface Bicycle {
      type: 'bicycle';
      color: string;
    }

    interface Motorcycle {
      type: 'motorcycle';
      engine: number;
    }

    type Vehicle = Car | Bicycle | Motorcycle;

    function printVehicleInfo(vehicle: Vehicle) {
      switch (vehicle.type) {
        case 'car':
          console.log(`Brand: ${vehicle.brand}, Wheels:${vehicle.wheels}`);
          break;
        case 'bicycle':
          console.log(`Color: ${vehicle.color}`);
          break;
        case 'motorcycle':
          console.log(`Engine: ${vehicle.engine}`);
          break;
        default:
          break;
      }
    }

    const car: Car = { type: 'car', brand: 'Toyota', wheels: 4 };
    const bicycle: Bicycle = { type: 'bicycle', color: 'red' };
    const motorcycle: Motorcycle = { type: 'motorcycle', engine: 1000 };
    printVehicleInfo(car); // 输出: Brand: Toyota, Wheels: 4
    printVehicleInfo(bicycle); // 输出: Color: red
    printVehicleInfo(motorcycle); // 输出: Engine: 1000
  });

  test('使用in操作符进行类型守卫', function () {
    interface Circle {
      kind: 'circle',
      radius: number;
    }

    interface Rectangle {
      kind: 'rectangle',
      width: number;
      length: number;
    }

    type Shape = Circle | Rectangle; // 联合类型

    // 类型谓词 shape is Circle
    function isCircle(shape: Shape): shape is Circle {
      return 'radius' in shape;
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