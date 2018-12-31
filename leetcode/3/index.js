/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    var str = '';
    var size = 0;

    for (var i = 0, len = s.length; i < len; i++) {
      var char = s.charAt(i);
      var index = str.indexOf(char);

      if (index === -1) {
        str += char;
        size = size < str.length ? str.length : size;
      } else {
        str = str.substr(index + 1) + char;
      }
    }

    return size;
};

console.log(lengthOfLongestSubstring('abcabcbb'))