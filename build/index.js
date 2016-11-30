"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var sun = function sun(a, b) {
  return a + b;
};
var x = sun(1, 2);
console.log(x);

var a = function a(b) {
  return b + 2;
};

var Chef = function () {
  function Chef(food) {
    _classCallCheck(this, Chef);

    this.food = food;
  }

  _createClass(Chef, null, [{
    key: "cook",
    value: function cook(food) {
      console.log(food);
    }
  }]);

  return Chef;
}();

var Animal = function () {
  function Animal() {
    _classCallCheck(this, Animal);
  }

  _createClass(Animal, [{
    key: "consturctor",
    value: function consturctor(name) {}
  }]);

  return Animal;
}();

// $.extends()

var target = { a: 1 };
var source1 = { b: 2 };
var source2 = { c: 3 };
var xx = Object.assign({}, target, source1, source2);