class LinkedList {
  constructor(node = null){
    this.node = !node ? null : new Node(node);
  }
  append(newNode) {
    let appendNode = new Node(newNode);
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

  prepend(newNode) {
    
    let prependNode = new Node(newNode);
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
      if (value === temp.value){
        return true;
      }
      temp = temp.nextNode;
    }
    return false;
  }

  findIndex(value) {
    for (let i = 0; i < this.size(); i++) {
      if (this.at(i).value === value) {
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

  insertAt(index, ...values) {
    if (index < 0 || this.size() < index) throw new RangeError("Index out of bound");
    let newValues = [...values];

    if (index === 0) {
      for (let i = newValues.length - 1; i >= 0; i--) {
        this.prepend(newValues[i]);
      }
      return ;
    }
    if (this.size() === index) {
      for (let value of newValues){
        this.append(value);
      }
      return;
    }

    let firstPos = this.node;
    let temp = this.at(index - 1)
    this.node = this.at(index);

    for (let i = newValues.length - 1; i >= 0; i--) {
      this.prepend(newValues[i]);
    }
    temp.nextNode = this.node;
    this.node = firstPos;
  }

  removedAt(index) {
    if (index < 0 || this.size() <= index) throw new RangeError("Index out of bound");

    if (index === 0) {
      this.pop();
      return ;
    }
    if (index === this.size()) {
      let temp = this.node;
      this.node = this.at(index - 1);
      this.node.nextNode = null;
      this.node = temp;
    }
    let firstPos = this.node;
    let temp = this.at(index - 1);
    this.node = this.at(index + 1);

    temp.nextNode = this.node;
    this.node = firstPos;
  }
}

class Node {
  constructor(value = null) {
    this.value = value;
    this.nextNode = null;
  }
}

const list = new LinkedList();

list.append("dog");
list.append("cat");
console.log("This list is currently of size: ", list.size())
console.log(list.toString())
console.log("\n- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n")
list.append("parrot");
list.prepend("hamster");
list.prepend("snake");
list.prepend("turtle");

console.log("This list is currently of size: ", list.size())
console.log(list.toString())

console.log("\n- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n")

console.log("The HEAD should be a Node with a Turtle value:\n", list.head())
console.log("\nThe TAIL should be a Node with a Parrot value:\n", list.tail())

console.log("\n- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n")

console.log("Node at indexes 0, 3, 5: turtle, dog, parrot:\n", list.at(0), list.at(3), list.at(5));

console.log("\n- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n")

list.pop();
list.pop();
console.log("List pop two nodes. Size: ", list.size());
console.log("Contains a value: Parrot: ", list.contains("parrot"));
console.log("Contains a value: Perrit: ", list.contains("perrit"));
console.log("Index of Perrit: ", list.findIndex("perrit"));
console.log("Index of Parrot: ", list.findIndex("parrot"));
console.log("\nSTRING REPRESENTATION (current list):\n", list.toString());
list.insertAt(0, "turtle", "snake");
console.log("\nTurtle and Snake came back. (current list):\n", list.toString());
list.removedAt(0);
console.log("\nTurtle removed. (current list):\n", list.toString());
