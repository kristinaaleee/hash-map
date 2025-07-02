import { LinkedList } from "../linked-list/linked-list.js";

export { HashMap };


// Array.from({ length: capacity }, (v, i) => linked list); to create buckets

class HashMap {
	constructor() {
        this.currentLoad = 0;
        this.loadFactor = 0.75;
        this.capacity = 16;
		this.buckets = new Array(this.capacity);
	}

	hash(key) {
		let hashCode = 0;
		const primeNumber = 31;
		for (let i = 0; i < key.length; i++) {
			hashCode = primeNumber * hashCode + key.charCodeAt(i);
		}

		return hashCode % this.buckets.length;
	}
	set(key, value) {
		const index = this.hash(key);
		// If empty create head to append (linked list)
		if (!this.buckets[index]) {
            // import head list
			this.buckets[index] = new LinkedList();
			this.buckets[index].append({key, value});
            this.currentLoad++;
		}

		if (this.buckets[index]) {
            let currentNode = this.head;
            // append to end
            while (currentNode != null){
                if (currentNode.key === key){
                    currentNode.value === value
                    return
                }
                currentNode = currentNode.next
            }
            this.buckets[index].append({key, value});
            

		}
        if (this.currentLoad > (this.loadFactor * this.capacity)) {
            this.capacity = this.capacity * 2;
            this.buckets.length = this.capacity; 
        };
	}
    get(key) {
        const index = this.hash(key);
        //Empty bucket
        if (!this.buckets[index]){
            return null;
        }
        const result = this.buckets[index].filter((element) => element.key === key);
        if (result[0]) return result[0].value;
        return null;
    }
    has(key){
        const index = this.hash(key);
        if (!this.buckets[index]){
            return false;
        }
        const result = this.buckets[index].filter((element) => element.key === key);
        if (result[0]) return true;
        return false;
    }
    remove(key){
        const index = this.hash(key);
        if (!this.buckets[index]){
            return false;
        }
        const result = this.buckets[index].filter((element) => element.key != key);
        if (result.length < this.buckets[index].length){
            this.buckets[index] = result;
            return true;
        }
        return false;
    }
    length(){
        let mapLength = 0;
        this.buckets.forEach((bucket) => mapLength += bucket.length)
        return mapLength;
    }
    clear(){
        this.buckets = new Array(this.capacity);
    }
    keys(){
        let keyArray = [];
        this.buckets.forEach((bucket) => bucket.forEach((element) => keyArray.push(element.key)))
        return keyArray;
    }
    values(){
        let valueArray = [];
        this.buckets.forEach((bucket) => bucket.forEach((element) => valueArray.push(element.value)))
        return valueArray;
    }
    entries(){
        let entriesArray = [];
        this.buckets.forEach((bucket) => bucket.forEach((element) => entriesArray.push([element.key, element.value])))
        return entriesArray;
    }

}


// test.set('banana', 'yellow')
// test.set('carrot', 'orange')
// test.set('dog', 'brown')
// test.set('elephant', 'gray')
// test.set('frog', 'green')
// test.set('grape', 'purple')
// test.set('hat', 'black')
// test.set('ice cream', 'white')
// test.set('jacket', 'blue')
// test.set('kite', 'pink')
// test.set('lion', 'golden')
// test.set('moon', 'silver')
// console.log(test.get('apple'));
// console.log(test.get('potato'));
// console.log(test.has('apple'));
// console.log(test.has('potato'));
// console.log(test.remove('potato'));
// console.log(test.remove('apple'));
// console.log(test.length());
// console.log(test.keys());
// console.log(test.values());
// console.log(test.entries());