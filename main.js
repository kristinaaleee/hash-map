import { HashMap } from "./hash-map.js";

const test = new HashMap();
test.set('apple', 'red');
test.set('banana', 'yellow')
test.set('apple', 'green')
console.log(test)