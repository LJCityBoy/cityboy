const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

function MyPromise(fn) {
  const self = this;
  self.state = PENDING;
  self.value = null;
  self.resolvedCallBacks = [];
  self.rejectedCallBacks = [];
  function resolve(value) {
    if (self.state === PENDING){
      self.state = RESOLVED;
      self.value = value;
      self.resolvedCallBacks.map(cb => cb(self.value));
    }
  }

  function rejecte(value) {
    if (self.state === PENDING){
      self.state = REJECTED;
      self.value = value;
      self.rejectedCallBacks.map(cb => (self.value));
    }
  }
}

MyPromise.prototype.then = function (onFulfilled,onRejected) {
  const self = this;
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
};

function teacher(name,age) {
  this.name = name;
  this.age = age;
  this.sayHi = function () {
    console.log('name: '+ name + ',age: ' + age);
  }
}

//call继承
function callAction1() {
  function student() {
    var args = arguments;//获取到所有传进来的参数
    console.log(args);
    teacher.call(this,args[0],args[1]);//继承teacher，并把传进来的前两个参数传递给teacher
  }

  var techer1 = new teacher('蒋哥',23);
  techer1.sayHi();

  var stud1 = new student('小明',12,'你好');
  stud1.sayHi();
}
callAction1();


var arr = [1,2,2,3,4,4,5];
var obj = {};
var date = [];
for (let i = 0; i < arr.length; i++) {
  if (!obj[arr[i]]){
    obj[arr[i]] = 1;
  }
}








