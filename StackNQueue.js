function Stack() {
  this.arr = [];
}
Stack.prototype.push = function(value) {
  this.arr.push(value);
};
Stack.prototype.pop = function() {
  var popped = this.arr.pop(); // inbult method to return last element of array
  return popped;
};

function Queue() {
  this.arr = [];
}
Queue.prototype.push = function(value) {
  this.arr.push(value);
};
Queue.prototype.pop = function() {
  var popped = this.arr.shift(); // inbult method to return first element of array
  return popped;
};
