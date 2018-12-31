/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  for (var i = 0, len = nums.length; i < len; i++) {
    var num = nums[i];
    var diff = target - num;
    var otherIndex = nums.indexOf(diff);
    
    if (otherIndex > -1 && i !== otherIndex) {
      return [i, otherIndex];
    }
  }
};