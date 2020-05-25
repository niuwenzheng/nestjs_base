const defaults = {
    decimal: '.',
    formatWithSymbol: false,
    errorOnInvalid: false,
    precision: 5
};

const round = function round(v) {
    return Math.round(v);
};
const pow = function pow(p) {
    return Math.pow(10, p);
};
const rounding = function rounding(value, increment) {
    return round(value / increment) * increment;
};

const lastDecimalRegex = /\.(\d+)$/;
const groupRegex = /(\d)(?=(\d{3})+\.)/g;
const vedicRegex = /(\d)(?=(\d\d)+\d\.)/g;


function parse(value, opts) {
  const useRounding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  let v = 0,
      decimal = opts.decimal,
      errorOnInvalid = opts.errorOnInvalid,
      decimals = opts.precision,
      precision = pow(decimals),
      isNumber = typeof value === 'number';


  if (isNumber || value instanceof float) {
      v = ((isNumber ? value : value.value) * precision).toFixed(1);
  } else if (typeof value === 'string') {
      const regex = new RegExp('[^-\\d' + decimal + ']', 'g'),
          decimalString = new RegExp('\\' + decimal, 'g');
      v = value.replace(/\((.*)\)/, '-$1') // allow negative e.g. (1.99)
      v = v.replace(regex, '') // replace any non numeric values
      v = v.replace(decimalString, '.') // convert any decimal values
      v = v * precision; // scale number to integer value
      v = v || 0;
  } else {
      if (errorOnInvalid) {
          throw Error('Invalid Input');
      }
      v = 0;
  }

  return useRounding ? round(v) : v;
}

/**
 * Create a new instance of float.js
 * @param {number|string|float} value
 * @param {object} [opts]
 */
function float(value, opts) {
    const that = this;

    if (!(that instanceof float)) {
        return new float(value, opts);
    }

    const settings = Object.assign({}, defaults, opts),
        precision = pow(settings.precision),
        v = parse(value, settings);

    that.intValue = v;
    that.value = v / precision;

    // Set default incremental value
    settings.increment = settings.increment || 1 / precision;

    // Support vedic numbering systems
    // see: https://en.wikipedia.org/wiki/Indian_numbering_system
    if (settings.useVedic) {
        settings.groups = vedicRegex;
    } else {
        settings.groups = groupRegex;
    }

    // Intended for internal usage only - subject to change
    this.s = settings;
    this.p = precision;
    return that;
}



float.prototype = {

    /**
     * Adds values together.
     * @param {number} number
     * @returns {float}
     */
    add: function add(number) {
        let intValue = this.intValue,
            _settings = this.s,
            _precision = this.p;

        const result = float((intValue += parse(number, _settings)) / _precision, _settings);
        return result;
    },


    /**
     * Subtracts value.
     * @param {number} number
     * @returns {float}
     */
    subtract: function subtract(number) {
        let intValue = this.intValue,
            _settings = this.s,
            _precision = this.p;

        const result = float((intValue -= parse(number, _settings)) / _precision, _settings);
        return result;
    },


    /**
     * Multiplies values.
     * @param {number} number
     * @returns {float}
     */
    multiply: function multiply(number) {
        let intValue = this.intValue,
            _settings = this.s;

        const result = float((intValue *= number) / pow(_settings.precision), _settings);
        return result;
    },


    /**
     * Divides value.
     * @param {number} number
     * @returns {float}
     */
    divide: function divide(number) {
        let intValue = this.intValue,
            _settings = this.s;

        const result = float(intValue /= parse(number, _settings, false), _settings);
        return result;
    },


    /**
     * Formats the value as a string according to the formatting settings.
     * @returns {string}
     */
    toString: function toString() {
        const intValue = this.intValue,
            _precision = this.p,
            _settings = this.s;

        return rounding(intValue / _precision, _settings.increment).toFixed(_settings.precision);
    },


    /**
     * Value for JSON serialization.
     * @returns {float}
     */
    toJSON: function toJSON() {
        return this.value;
    }
};



const utils = module.exports;

/**
 * 加法运算，避免数据相加小数点后产生多位数和计算精度损失。
 *
 * @param num1加数1 | num2加数2
 */
utils.numAdd = function (num1, num2, precision) {
    const ops = {};
    if(precision >= 0){
        ops.precision = precision;
    }
    const floatNum1 = float(num1, ops);
    let result = floatNum1.add(num2);
    result = Number(result);
    // console.log('MathUtil -> numAdd() num1: %s, num2: %s, result: %s', num1, num2, result);
    return result;
};
/**
 * 加法运算，避免数据相减小数点后产生多位数和计算精度损失。
 *
 * @param num1被减数  |  num2减数
 */
utils.numSub = function (num1, num2, precision) {
    const ops = {};
    if(precision >= 0){
        ops.precision = precision;
    }
    const floatNum1 = float(num1, ops);
    let result = floatNum1.subtract(num2);
    result = Number(result);
    // console.log('MathUtil -> numSub() num1: %s, num2: %s, result: %s', num1, num2, result);
    return result;
};
/**
 * 乘法运算，避免数据相乘小数点后产生多位数和计算精度损失。
 *
 * @param num1被乘数 | num2乘数
 */
utils.numMulti = function (num1, num2, precision) {
    const ops = {};
    if(precision >= 0){
        ops.precision = precision;
    }
    const floatNum1 = float(num1, ops);
    let result = floatNum1.multiply(num2);
    result = Number(result);
    // console.log('MathUtil -> numMulti() num1: %s, num2: %s, result: %s', num1, num2, result);
    return result;
};
/**
 * 除法运算，避免数据相除小数点后产生多位数和计算精度损失。
 *
 * @param num1被除数 | num2除数
 */
utils.numDiv = function (num1, num2, precision) {
    const ops = {};
    if(precision >= 0){
        ops.precision = precision;
    }
    const floatNum1 = float(num1, ops);
    let result = floatNum1.divide(num2);
    result = Number(result);
    // console.log('MathUtil -> numDiv() num1: %s, num2: %s, result: %s', num1, num2, result);
    return result;
};
