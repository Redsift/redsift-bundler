import data from './data.json';
import dataNoExt from './data';

export function test() {
  console.log('Hello bundle', data);
}

export class TestClass {
  constructor() {
    console.log('constructor: ', dataNoExt);
  }
}

// 'babel-plugin-transform-class-properties' is not enabled currently
export class TestClass2 {
  static myProp1 = 'static prop';
  myProp2 = 'prop';
}
