import { LinkedList } from "../linked-list/linked-list.js";

export { HashSet };

class HashSet {
	constructor() {
        this.currentLoad = 0;
        this.loadFactor = 0.75;
        this.capacity = 16;
		this.buckets = new Array(this.capacity);
	}
    
    _hash(value) {
		let hashCode = 0;
		const primeNumber = 31;
		for (let i = 0; i < value.length; i++) {
			hashCode = primeNumber * hashCode + value.charCodeAt(i);
		}

		return hashCode % this.buckets.length;
	}

    _resize(){
        let bucketHolder = this.buckets;
        this.capacity = this.capacity * 2;
        this.buckets = new Array (this.capacity)
        this.currentLoad = 0

        bucketHolder.forEach((bucket) => {
            let index = 0;
            while (index < bucket.size()){
                this.set(bucket.at(index))
                index++
            }
        })
    }

    // Add value to buckets - UNIQUE VALUES
    set(value) {
		let index = this._hash(value);
		// If empty create head to append (linked list)
		if (!this.buckets[index]) {
            // import head list
			this.buckets[index] = new LinkedList();
			this.buckets[index].append(value);
            this.currentLoad++;
		} else if (this.buckets[index]) {
            let valueIndex = this.buckets[index].find(value)
            // Add only unique values
            if (valueIndex === null){
                this.buckets[index].append(value);
                this.currentLoad++;
            }
        }

        if (this.currentLoad > (this.loadFactor * this.capacity)) {
            this._resize();
        };
	}
    //No get method since only stores values 

    // Checks if value exists
    has(value){
        const index = this._hash(value);
        if (!this.buckets[index]){
            return false;
        }
        let valueIndex  = this.buckets[index].find(value)
        if (valueIndex != null) return true;
        return false;
    }

    // Remove value
    remove(value){
        const index = this._hash(value);
        if (!this.buckets[index]){
            return false;
        }
        let valueIndex = this.buckets[index].find(value)
        if (valueIndex != null){
            this.buckets[index].removeAt(valueIndex)
            this.currentLoad--;
            return true;
        }
        return false;
    }
    
    length(){
        return this.currentLoad;
    }

    clear(){
       this.buckets = new Array(this.capacity);
    }

    // Returns array of values
    entries(){
        let entriesArray = [];
        this.buckets.forEach((bucket) => {
            let index = 0;
            while (index < bucket.size()){
                entriesArray.push(bucket.at(index))
                index++
            }
        })
        return entriesArray;
    }
}