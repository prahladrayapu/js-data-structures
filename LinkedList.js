function Node(data) {
  this.data = data;
  this.next = null;
}

function LinkedList() {
  this.head = null;
  this.length = 0;
}

LinkedList.prototype.addNode = function(value) {
  var node = new Node(value);
  if (!this.head){
    this.head = node;
  }else{
    var curNode = this.head;
    while(curNode.next) {
      curNode = curNode.next;
    }
    curNode.next = node;
  }
  this.length++;
}

LinkedList.prototype.getLength = function() {
  return this.length;
}

LinkedList.prototype.removeNode = function(value) {
  if (this.head) {
    var prevNode = null;
    var curNode = this.head;
    if (curNode.data === value) {
      this.head = curNode.next;
    }else{
      prevNode = curNode;
      curNode = curNode.next;
      while(curNode && curNode.data !== value) {
        prevNode = curNode;
        curNode = curNode.next;
      }
      prevNode.next = curNode.next;
      curNode = null;
    }
    this.length--;
  }
}

LinkedList.prototype.getMiddle = function() {
  if (this.head) {
    var firstPointer, secondPointer;
    firstPointer = secondPointer = this.head;
    while(secondPointer && secondPointer.next) {
      firstPointer = firstPointer.next;
      secondPointer = secondPointer.next.next;
    }
    return firstPointer;
  }
}
