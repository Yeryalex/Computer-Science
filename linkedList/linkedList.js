class LinkedList {
  constructor(node = null){
    this.node = node;
  }
  
  append(newNode) {
    let temp = this.node;
    while (temp.nextNode) {
      temp = temp.nextNode;
    }
    temp.nextNode = newNode;
  }

  prepend(newNode) {
    newNode.nextNode = this.node;
    this.node = newNode;
  }
  size() {
    let counter = 0;
    while(this.node) {
      counter += 1;
    }
    return counter;
  }
}

class Node {
  constructor(value = null) {
    this.value = value;
    this.nextNode = null;
  }

}


let test = new LinkedList(new Node("yery"));

test.append(new Node("Alexander"))
test.append(new Node("Rodriguez"))
test.append(new Node("Gonzalez"));
test.append(new Node("One more"));
test.append(new Node("Two more"));
test.prepend(new Node("Prepended"))


let head = test.node;

while (head) {
  console.log(head.value);
  head = head.nextNode;
}
