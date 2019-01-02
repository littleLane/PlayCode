// 节流器
function throttle(handleFunc, threshhold) {
  let startDate = new Date();
  const holdTime = threshhold || 160;

  return function() {
      const currentDate = +new Date();
      const context = this;
      const args = arguments;

      if (currentDate - startDate >= holdTime) {
          handleFunc.apply(context, args);

          // 执行后更新 startDate 值
          startDate = currentDate; 
      }
  }
}

// 使用节流器
const throttleResize = throttle(function() {
  console.log('resize' + new Date().getTime());
});

window.addEventListener('resize', throttleResize);