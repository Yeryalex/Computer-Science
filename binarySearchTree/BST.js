class Node {
    constructor(data = null) {
        this.data = data;
        this.left = null; 
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.sortedArray = this.#sortArray(array);
        this.root = this.#buildTree(this.sortedArray, 0, this.sortedArray.length - 1);
    }
    #valueIncluded = false;
    #sortArray(array) {
        let set = new Set(array);
        let sortedArray = [...set];
        sortedArray.sort((a, b) => a - b);
        return sortedArray;
    }
    #buildTree(array, start, end) {
        
        if (start > end) return null;
        let mid = Math.floor(start + (end - start) / 2);
        let root = new Node(array[mid]);
        
        root.left = this.#buildTree(array, start, mid - 1);
        root.right = this.#buildTree(array, mid + 1, end);
        return root;
    }

    #preorder(node, value) {
        if (!node) return ;
        if (value === node.data) this.#valueIncluded = true;
        this.#preorder(node.left, value);
        this.#preorder(node.right, value);
    }
    
    includes(value) {
        this.#preorder(this.root, value);
        let included = this.#valueIncluded;
        this.#valueIncluded = false;
        return (included)
    }

    #insertRecursive(node, value) {

        if (value < node.data && !node.left){
            let newNode = new Node(value);
            node.left = newNode;
            return ;
        }
        if (value > node.data && !node.right) {
            let newNode = new Node(value);
            node.right = newNode;
            return ;
        }

        if (value < node.data) this.#insertRecursive(node.left, value);
        if (value > node.data) this.#insertRecursive(node.right, value);

    }
    insert(value) {
        if (this.includes(value)) return this.root;
        this.#insertRecursive(this.root, value);
        return this.root;
    }

    #deleteRec(node, value) {

        if (!node) return ;

        while (node.right && node.left) {

            let newNode = node.right;
            if (node.data === value) {
                let targetNode = node.data;
                if (newNode.left) {
                    node.data = newNode.left.data;
                    newNode.left.data = targetNode;
                    node = newNode.left;
                }
                else if (newNode.right){
                   
                    node.data = newNode.data;
                    newNode.data = newNode.right.data;
                    newNode.right.data = targetNode;
                     node = node.right;
                }
                else if (!newNode.right && !newNode.left) {
                    node.data = newNode.data;
                    newNode.data = targetNode;
                }
            } else break ;
 
            if (!node.left || !node.right){
                node = newNode;
            }
        }


        if (node.data === value ) {
            if (node.left) {
                this.root = node.left;
                return ;
            }
            if (node.right) {
                this.root = node.right;
                return ;
            }
            if (!node.left && !node.right){
                this.root = null;
            }
        }
        if (node.right && node.right.data === value) {
            if (!node.right.right && !node.right.left) {
                node.right = null;
                return;
            }
            if (!node.right.left && node.right.right){
                node.right = node.right.right;
                return ;
            }
            if (node.right.left && !node.right.right){
                node.right = node.right.left;
                return ;
            }
        }
        if (node.left && node.left.data === value) {
            if (!node.left.right && !node.left.left) {
                node.left = null;
                return ;
            }
            if (!node.left.right && node.left.left){
                node.left = node.left.left;
                return ;
            }
             if (node.left.right && !node.left.left){
                node.left = node.left.right;
                return ;
            }
        }

        if (value < node.data) this.#deleteRec(node.left, value);
        if (value > node.data) this.#deleteRec(node.right, value);
    }
    deleteItem(value) {
        if (!this.includes(value)) return ;
        this.#deleteRec(this.root, value)
    }

    levelOrderForEach(callback) {
        if (typeof callback !== "function") throw new Error("No callback function provided.");
        let queue = [];

        queue.push(this.root);
        while (queue.length) {
            let currentNode = queue[0];
            callback(currentNode.data);
            if (currentNode.left) queue.push(currentNode.left);
            if (currentNode.right) queue.push(currentNode.right);
            queue.shift()
        }
    }
}


const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null || node === undefined) {
    return ;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}



let test = new Tree([1, 7, 4, 23, 76, -2, -32, 54, 5, 45, 68,98, 32, 9, 4, 3, 5, 7, 9, 6345, 324]);


test.insert(-1)
test.insert(323)
test.insert(7000)
test.insert(53)

prettyPrint(test.root)


test.deleteItem(6345)
test.deleteItem(7000)
test.deleteItem(324)
test.deleteItem(1)
test.deleteItem(323)
test.deleteItem(7)
test.deleteItem(23);


prettyPrint(test.root)


test.levelOrderForEach((e) => console.log(e));
prettyPrint(test.root)
