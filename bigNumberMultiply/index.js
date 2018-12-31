function multiply(a, b) {
  const str1 = a.split('').reverse();
  const str2 = b.split('').reverse();

  const len1 = str1.length;
  const len2 = str2.length;

  const result = [];

  // 这里初始化一个 result 数组，result 长度等于 len1+len2-1
  // 这里的逻辑其实可以整合到下面的双重循环
  for(let i = 0; i < len1; i++) {
    for(let j = 0; j < len2; j++) {
      result[i + j] = 0;
    }
  }

  // 使用双重循环遍历两个数组，对每项进行相乘，然后与 result 相等角标的元素累加
  // 这里先不处理相加大于 10 的情况
  for(let i = 0; i < len1; i++) {
    for(let j = 0; j < len2; j++) {
      result[i + j] += parseInt(str1[i]) * parseInt(str2[j]);
    }
  }

  // 对 result 数据进行遍历处理元素大于 10 的情况
  // 注意：要处理 result[result.length - 1] 大于 10 的情况
  for(let k = 0, len = result.length; k < len; k++) {
    const temp = result[k];
    if(temp >= 10) {
      result[k] = temp % 10;
      result[k + 1] = (result[k + 1] ? result[k + 1] : 0) + Math.floor(temp / 10);
    }
  }

  return result.reverse().join('');
}

console.log(multiply('88', '99'))