import { HashMap } from "./hash-map.js";
import { HashSet } from "./hash-set.js";

const test = new HashMap();
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
test.set('lion', 'black')
test.set('kite', 'red')
test.set('moon', 'silver')
console.log(test)
console.log(test.get('apple'));
console.log(test.get('potato'));
console.log(test.has('apple'));
console.log(test.has('potato'));
console.log(test.remove('potato'));
console.log(test.remove('apple'));
console.log(test.length());
console.log(test.keys());
console.log(test.values());
console.log(test.entries());

// const extra = new HashSet();
// extra.set('apple')
// extra.set('banana')
// extra.set('banana')
// extra.set('carrot')
// extra.set('dog')
// extra.set('elephant')
// extra.set('frog')
// extra.set('grape')
// extra.set('hat')
// extra.set('ice cream')
// extra.set('jacket')
// extra.set('kite')
// extra.set('moon')
// extra.set('clown')
// extra.set('potato')
// console.log(extra.has('potato'))
// console.log(extra.has('tomato'))
// console.log(extra.remove('potato'));
// console.log(extra.remove('tomato'));
// console.log(extra.length());
// console.log(extra.entries());
// console.log(extra);

