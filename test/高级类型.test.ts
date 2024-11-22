
describe("高级类型", function () {

  interface Person {
    name: string;
    age: number;
  }

  // type NewType = {[Property in keyof ExistingType]: TransformType;};
  test("Readonly内置映射类型", function () {
    type ReadonlyPerson = Readonly<Person>;
    const person: ReadonlyPerson = {
      name: 'apple',
      age: 12
    }
    // person.age = 20;
    expect(person.age).toEqual(12);
  });

  test("Partial内置可选类型", function () {
    type PartialPerson = Partial<Person>;
    const person: PartialPerson = {
      name: "John",
    };
    expect(person.age).toBeUndefined();
  });

  test("Record 映射类型, 根据指定的键类型和值类型创建一个新的对象类型", function () {
    type Weekday = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
    type WorkingHours = Record<Weekday, string>;
    const hours: WorkingHours = {
      Monday: '09:00 ~ 20:30',
      Tuesday: '09:00 ~ 18:00',
      Wednesday: '09:00 ~ 20:30',
      Thursday: '09:00 ~ 20:30',
      Friday: '09:00 ~ 18:00',
    }
    expect(hours.Monday).toEqual('09:00 ~ 20:30');
  });

  test("模板字面量类型", function () {
    type Greeting<T extends string> = `Hello ${T}`;
    const greet: Greeting<'JavaScript'> = 'Hello JavaScript';
    expect(greet).toEqual('Hello JavaScript');
    type GreetingWorld = Greeting<'World'>;
    const world: GreetingWorld = 'Hello World';
    expect(world).toEqual('Hello World');
  });

  test('条件类型', function () {
    type Message<T extends boolean> = T extends true ? 'Enabled' : 'Disabled';
    const message: Message<true> = 'Enabled';
    expect(message).toEqual('Enabled');
  });
});