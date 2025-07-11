import { LinkedList } from "../linked-list/linked-list.js";

export { HashMap };

class HashMap {
	constructor() {
        this.currentLoad = 0;
        this.loadFactor = 0.75;
        this.capacity = 16;
		this.buckets = new Array(this.capacity);
	}

	_hash(key) {
		let hashCode = 0;
		const primeNumber = 31;
		for (let i = 0; i < key.length; i++) {
			hashCode = primeNumber * hashCode + key.charCodeAt(i);
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
                this.set(bucket.at(index).key, bucket.at(index).value)
                index++
            }
        })
    }

    // Add key value pair to buckets - UNIQUE KEYS
	set(key, value) {
		let index = this._hash(key);
		// If empty create head to append (linked list)
		if (!this.buckets[index]) {
            // import head list
			this.buckets[index] = new LinkedList();
			this.buckets[index].append({key, value});
            this.currentLoad++;
		} else if (this.buckets[index]) {
            let keyIndex  = this.buckets[index].find(key)
            if (keyIndex === null){
                this.buckets[index].append({key, value});
                this.currentLoad++;
            } else {
                this.buckets[index].removeAt(keyIndex)
                this.buckets[index].insertAt({key, value}, keyIndex) 
            }
        }

        if (this.currentLoad > (this.loadFactor * this.capacity)) {
            this._resize();
        };
	}

    // Returns value using key to search buckets
    get(key) {
        const index = this._hash(key);
        //Empty bucket
        if (!this.buckets[index]){
            return null;
        }
        let keyIndex  = this.buckets[index].find(key)
        if (keyIndex != null) return this.buckets[index].at(keyIndex).value;
        return null;
    }

    // Checks if key assists in any buckets
    has(key){
        const index = this._hash(key);
        if (!this.buckets[index]){
            return false;
        }
        let keyIndex  = this.buckets[index].find(key)
        if (keyIndex != null) return true;
        return false;
    }

    // Remove key value pair using key
    remove(key){
        const index = this._hash(key);
        if (!this.buckets[index]){
            return false;
        }
        let keyIndex = this.buckets[index].find(key)
        if (keyIndex != null){
            this.buckets[index].removeAt(keyIndex)
            this.currentLoad--;
            return true;
        }
        return false;
    }

    length(){
        // let mapLength = 0;
        // this.buckets.forEach((bucket) => mapLength += bucket.size())
        // return mapLength;
        return this.currentLoad;
    }

    // Clears buckets but keeps current capacity
    clear(){
        this.buckets = new Array(this.capacity);
    }
    
    // Returns array of keys
    keys(){
        let keyArray = [];
        this.buckets.forEach((bucket) => {
            let index = 0;
            while (index < bucket.size()){
                keyArray.push(bucket.at(index).key)
                index++
            }
        })
        return keyArray;
    }

    // Returns array of values
    values(){
        let valueArray = [];
        this.buckets.forEach((bucket) => {
            let index = 0;
            while (index < bucket.size()){
                valueArray.push(bucket.at(index).value)
                index++
            }
        })
        return valueArray;
    }

    // Returns array of [key, value]
    entries(){
        let entriesArray = [];
        this.buckets.forEach((bucket) => {
            let index = 0;
            while (index < bucket.size()){
                entriesArray.push([bucket.at(index).key, bucket.at(index).value])
                index++
            }
        })
        return entriesArray;
    }
}
