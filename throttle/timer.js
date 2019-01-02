// 节流器
function throttle(handleFunc, threshhold) {
  let time;
  const holdTime = threshhold || 160;

  return function(){
      const context = this;
      const args = arguments;

      if(!time){
          time = setTimeout(function(){
              handleFunc.apply(context, args);
              time = null;
          }, holdTime)
      }
  }
}

// 使用节流器
const throttleResize = throttle(function() {
  console.log('resize' + new Date().getTime());
});

window.addEventListener('resize', throttleResize);