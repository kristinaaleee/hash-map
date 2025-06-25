class HashMap {
	constructor() {
        this.loadFactor;
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
		// If empty create array to push values into (linked list?)
		if (!this.buckets[index]) {
			this.buckets[index] = [];
			this.buckets[index].push({key, value});
		}

		if (this.buckets[index]) {
			for (let i = 0; i < this.buckets[index].length; i++) {
				if (this.buckets[index][i].key === key) {
					this.buckets[index][i].value = value;
				} else {
					this.buckets[index].push({key, value});
				}
			}
		}
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

const test = new HashMap();
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
console.log(test);
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