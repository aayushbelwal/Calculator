// class Calculator
class Calculator {
  constructor(pre_exp_elm, cur_exp_elm) {
    this.pre_exp = pre_exp_elm.innerText;
    this.cur_exp = cur_exp_elm.innerText;
    this.allClear();
  }

  allClear() {
    this.pre_exp = "";
    this.cur_exp = "";
    this.opr = undefined;
  }

  clear() {
    if (this.cur_exp == "") return;
    this.cur_exp = cur_exp_elm.innerText.slice(0, -1);
  }

  append(num) {
    if (num == "." && this.cur_exp.includes(".")) return;
    this.cur_exp += num;
  }

  compute() {
    if (this.pre_exp == "" || this.cur_exp == "") return;
    this.cur_exp = eval(`${this.pre_exp} ${this.opr} ${this.cur_exp}`);
    this.opr = undefined;
    this.pre_exp = "";
  }

  selectOperation(opr) {
    if (this.cur_exp == "" || this.cur_exp == "-") return;
    if (this.pre_exp != "") this.compute();
    this.opr = opr;
    this.pre_exp = this.cur_exp;
    this.cur_exp = "";
  }

  updateResult() {
    cur_exp_elm.innerText = this.cur_exp;
    if (this.opr != null) {
      pre_exp_elm.innerText = `${this.pre_exp} ${this.opr}`;
    } else {
      pre_exp_elm.innerText = this.pre_exp;
    }
  }
}

// elements of DOM
const pre_exp_elm = document.querySelector("[previous-expression]");
const cur_exp_elm = document.querySelector("[current-expression]");

const all_clear_btn = document.querySelector("[all-clear]");
const clear_btn = document.querySelector("[clear]");
const equal_btn = document.querySelector("[equal]");

const minus_btn = document.querySelector("[minus]");
const num_btns = document.querySelectorAll("[number]");
const opr_btns = document.querySelectorAll("[operation]");

// instance of Calculator
const calculator = new Calculator(pre_exp_elm, cur_exp_elm);

// event listners
all_clear_btn.addEventListener("click", () => {
  calculator.allClear();
  calculator.updateResult();
});

clear_btn.addEventListener("click", () => {
  calculator.clear();
  calculator.updateResult();
});

minus_btn.addEventListener("click", () => {
  if (cur_exp_elm.innerText.slice(-1) == "-") return;
  if (cur_exp_elm.innerText == "") calculator.append(minus_btn.innerText);
  else calculator.selectOperation(minus_btn.innerText);
  calculator.updateResult();
});

num_btns.forEach((num_btn) => {
  num_btn.addEventListener("click", () => {
    calculator.append(num_btn.innerText);
    calculator.updateResult();
  });
});

opr_btns.forEach((opr_btn) => {
  opr_btn.addEventListener("click", () => {
    calculator.selectOperation(opr_btn.innerText);
    calculator.updateResult();
  });
});

equal_btn.addEventListener("click", () => {
  calculator.compute();
  calculator.updateResult();
});
