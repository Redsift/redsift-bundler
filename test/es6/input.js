export function test() {
  console.log('Hello bundle...');
}

export class TestClass {
  constructor() {
    console.log('constructor');
  }
}

// 'babel-plugin-transform-class-properties' is not enabled currently
export class TestClass2 {
  static myProp1 = 'static prop';
  myProp2 = 'prop';
}
