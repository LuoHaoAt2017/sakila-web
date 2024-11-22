import { log } from '@/decorator/log';

@log
class MyClass {
  private name: string;
  constructor(name: string) {
    console.log('Example instance created.');
    this.name = name;
  }

  greet() {
    return `Hello ${this.name}`;
  }
}

function About() {
  const myObj = new MyClass("John");
  myObj.greet();
  return <div></div>
}

export default About;
