
export function log(target: any) {
  console.log(`Class ${target.name} is created.`);
  // 保存原始构造函数
  const originalConstructor = target;

  // 新的构造函数
  function newConstructor(...args) {
    console.log(`Creating instance of ${originalConstructor.name}`);
    // 创建一个新的实例，并返回
    const instance = new originalConstructor(...args);
    return instance;
  }

  // 确保新的构造函数的原型指向原始构造函数的原型
  newConstructor.prototype = originalConstructor.prototype;

  // 返回新的构造函数
  return newConstructor as any;
}