function addNumber(a, b) {
  const len1 = a.length;
  const len2 = b.length;

  let fixA = '';
  let fixB = '';

  // 数字字符串前置补 0
  if (len1 < len2) {
    fixA = a.padStart(len2, 0);
    fixB = b;
  } else {
    fixA = a;
    fixB = b.padStart(len1, 0);
  }

  let carry = 0;
  const result = [];

  for (let len = fixA.length, i = len - 1; i >= 0; i--) {
    const countItems = Number(fixA[i]) + Number(fixB[i]) + carry;
    if (countItems >= 10) {
      result[i] = countItems - 10;
      carry = 1;
    } else {
      result[i] = countItems;
      carry = 0;
    }
  }

  return result.join('');
}


console.log(addNumber('123', '100'))