

const randomAtoB = function(under: number, over: number) {
  switch (arguments.length) {
    case 1:
      return Math.random() * under + 1;
    case 2:
      return Math.random() * (over - under + 1) + under;
    default:
      return 0;
  }
};

const randomByProb = function(probability) {
  const seed = 10000;
  const randomNum = randomAtoB(seed);
  const percent = 0.01 * probability;
  const probNum = percent * seed;

  if (randomNum <= probNum) {
    return true;
  }

  return false;
};

const randomByArr = function(oArr) {
  let sum = 0; // 总和
  let rand = 0; // 每次循环产生的随机数
  let result = 0; // 返回的对象的key
  // 计算总和
  for (const i in oArr) {
    sum += oArr[i][1];
  }

  // 思路就是如果设置的数落在随机数内，则返回，否则减去本次的数
  for (const i in oArr) {
    rand = Math.floor(Math.random() * sum + 1);
    // logger.debug('randomByArr - ', rand);
    if (oArr[i][1] >= rand) {
      result = oArr[i];
      break;
    } else {
      sum -= oArr[i][1];
    }
  }

  return result;
};
const randomUtil = {
  randomAtoB,
  randomByProb,
  randomByArr
};
export = randomUtil;
