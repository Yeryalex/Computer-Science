class LinkedList {
  constructor(node = null){
    this.node = !node ? null : new Node(node);
  }
  append(newNode, value) {
    let appendNode = new Node(newNode, value);
    if (!this.node) {
      this.node = appendNode;
      return ;
    }
    let firstPos = this.node;
    while (this.node.nextNode) {
      this.node = this.node.nextNode;
    }
    this.node.nextNode = appendNode;
    this.node = firstPos;
  }

  prepend(newNode, value) {
    
    let prependNode = new Node(newNode, value);
    if (!this.node) {
      this.node = prependNode;
      return ;
    }
    let temp = prependNode;
    while(temp.nextNode){
      temp = temp.nextNode;
    }
    temp.nextNode = this.node;
    this.node = prependNode;
  }

  size() {
    let counter = 0;
    let temp = this.node;
    while(temp) {
      counter += 1;
      temp = temp.nextNode;
    }
    return counter;
  }

  head(){
    if(!this.node) return undefined;
    return(this.node);
  }
  
  tail() {
    if (!this.node) return undefined;
    let temp = this.node;
    while (temp.nextNode) {
      temp = temp.nextNode;
    }
    return temp;
  }

  at(index) {
    if (!this.node) return undefined;
    let temp = this.node;
    let counter = 0;
    while (temp) {
      if (counter === index){
        return temp;
      }
      counter += 1;
      temp = temp.nextNode;
    }
    return undefined;
  }

  pop() {
    if (!this.node) return undefined;
    let temp = this.node;
    this.node = this.node.nextNode;
    return(temp);
  }

  contains(value) {
    let temp = this.node;

    while (temp) {
      if (value === temp.key){
        return true;
      }
      temp = temp.nextNode;
    }
    return false;
  }

  findIndex(value) {
    for (let i = 0; i < this.size(); i++) {
      if (this.at(i).key === value) {
        return i;
      }
    }
    return -1;
  }

  toString() {
    let temp = this.node;
    let finalString = "";
    while(temp) {
      finalString = finalString + `(${temp.value}) -> `;
      temp = temp.nextNode;
    }
    finalString += "null";
    return finalString;
  }

  insertAt(index, key, value) {
    if (index < 0 || this.size() < index) throw new RangeError("Index out of bound");

    if (index === 0) {
        this.prepend(key, value);
      return ;
    }
    if (this.size() === index) {
        this.append(key, value);
      return;
    }

    let firstPos = this.node;
    let temp = this.at(index - 1)
    this.node = this.at(index);

      this.prepend(key, value);
    temp.nextNode = this.node;
    this.node = firstPos;
  }

  removedAt(index) {
    if (index < 0 || this.size() <= index) throw new RangeError("Index out of bound");

    if (index === 0) {
      this.pop();
      return ;
    }

    let firstPos = this.node;
    let head = this.node;
    let afterNode = this.at(index + 1);
    let removeNode = this.at(index - 1);
    
    removeNode.nextNode = null;

    while (head.nextNode){
        head = head.nextNode;
    }

    if (afterNode) head.nextNode = removeNode;
    this.node = firstPos;
  }
}

class Node {
  constructor(key = null, value = null) {
    this.key = key;
    this.value = value;
    this.nextNode = null;
  }
}

///////////////////////////////////////////////////////////////////////////

class HashMap {
    constructor() {
        this.loadFactor = 0.75;
        this.capacity = 16;
        this.limitCapacity = 0;
        this.buckets = [];
        this.buckets.length = this.capacity;
    }

    hash(key) {
        let hashCode = 0;
        
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        return hashCode;
    }

    set(key, value) {
        let hashCode = this.hash(key);
        if (hashCode > Number.MAX_SAFE_INTEGER) {
            throw new Error("Key value is too Long");
        }
        let index = hashCode % this.capacity;
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        let list = new LinkedList();
        list.append(key, value);

        if (this.buckets[index]){
            
            let head = this.buckets[index];
            let foundIndex = head.findIndex(key);

            if (foundIndex >= 0) {
                head.removedAt(foundIndex);
                head.insertAt(foundIndex, key, value);
                return ;
            }
            head.prepend(key, value);
            this.limitCapacity += 1;
            if (this.limitCapacity > this.capacity * this.loadFactor){
                this.capacity *= 2;
                this.buckets.length = this.capacity;
            }
        }else {
            this.buckets[index] = list;
            this.limitCapacity += 1;
            if (this.limitCapacity > this.capacity * this.loadFactor){
                this.capacity *= 2;
                this.buckets.length = this.capacity;
            }
        }
    }
    get(key) {
        let hashCode = this.hash(key);
        if (hashCode > Number.MAX_SAFE_INTEGER) {
            throw new Error("Key value is too Long");
        }
        let index = hashCode % this.capacity;
        if (this.buckets[index]) {
            let head = this.buckets[index];
            let foundIndex = head.findIndex(key);
            if (foundIndex >= 0) {
                return head.at(foundIndex).value;
            }
        }
        return undefined;
    }
    has(key){
        let hashCode = this.hash(key);
        if (hashCode > Number.MAX_SAFE_INTEGER) {
            throw new Error("Key value is too Long");
        }
        let index = hashCode % this.capacity;
        if (this.buckets[index]) {
            let head = this.buckets[index];
            return head.contains(key);
        }
        return false;
    }
    remove(key){
        let hashCode = this.hash(key);
        if (hashCode > Number.MAX_SAFE_INTEGER) {
            throw new Error("Key value is too Long");
        }
        let index = hashCode % this.capacity;
        if (this.buckets[index]) {
            let head = this.buckets[index];
            let foundIndex = head.findIndex(key);
            if (foundIndex >= 0) {
                head.removedAt(foundIndex);
                return true;
            }
        }
        return false;
    }
    length(){
        let counter = 0;
        let head = this.buckets;
        for (let value of head) {
            if (value) {
                counter += value.size();
            }
        }
        return counter;
    }
    clear() {
        this.buckets.length = 0;
        this.capacity = 16;
        this.buckets.length = this.capacity;
        this.limitCapacity = 0;
    }
    keys() {

        let allKeys = [];
        let buckets = this.buckets;
        for (let value of buckets) {
            if (value) {
                let head = value.node;
                while (head) {
                    allKeys.push(head.key);
                    if (head.nextNode === null) break;
                    head = head.nextNode;
                }
            }
        }
        return allKeys;
    }
    values() {
        let allValues = [];
        let buckets = this.buckets;
        for (let value of buckets) {
            if (value) {
                let head = value.node;
                while (head) {
                    allValues.push(head.value);
                    if (head.nextNode === null) break;
                    head = head.nextNode;
                }
            }
        }
        return allValues;
    }

    entries() {
        let allEntries = [];
        let buckets = this.buckets;
        for (let value of buckets) {
            if (value) {
                let head = value.node;
                while (head) {
                    allEntries.push([head.key, head.value]);
                    if (head.nextNode === null) break;
                    head = head.nextNode;
                }
            }
        }
        return allEntries;
    }

    printHashMap() {
        for (let value of this.buckets){
            if (value) console.log(value.head());
        }
    }
}


let test = new HashMap();

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


test.printHashMap()
