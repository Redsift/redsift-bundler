export function test() {
  console.log('Hello bundle...');
}

export class TestClass {
  constructor() {
    console.log('constructor');
  }
}

export class TestClass2 {
  static myProp1 = 'static prop';
  myProp2 = 'prop';
}
