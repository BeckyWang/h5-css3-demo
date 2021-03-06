  (function() {
      var ul = document.getElementById('list');
      var li = ul.getElementsByTagName('li');
      var liFirst = li[0].offsetTop; // 第一个li位置
      var liHeight = li[0].offsetHeight; // 纵向排序, 获取li的高度
      // 对每个元素绑定拖拽事件
      for (var i = 0; i < li.length; i++) {
          drag(li[i]);
      }

      function drag(obj) {
          obj.onmousedown = function(ev) {
              var ev = ev || event;
              // 创建空白节点，插入原节点位置占位
              var blank = document.createElement('li');
              ul.insertBefore(blank, obj.nextSibling);
              blank.style.visibility = 'hidden';
              
              // 原节点绑定拖拽样式（absolute等）
              obj.style.left = obj.offsetLeft + 'px';
              obj.style.top = obj.offsetTop + 'px';
              obj.style.position = "absolute";
              obj.style.zIndex = '1000';
              obj.style.background = '#c1edde';
              obj.style.border = '2px dashed #bcbcbc';

              var disX = ev.clientX - obj.offsetLeft;
              var disY = ev.clientY - obj.offsetTop;

              document.onmousemove = function(ev) {
                  var ev = ev || event;
                  var L = ev.clientX - disX;
                  var T = ev.clientY - disY;

                  // 根据当前拖拽到的位置计算其重新排序后的位置
                  var n = Math.round((T - liFirst) / liHeight + 1);
                  // 将空白节点插入到该位置
                  ul.insertBefore(blank, ul.children[n]);

                  obj.style.left = L + 'px';
                  obj.style.top = T + 'px';
              };
              document.onmouseup = function() {

                  // 将被拖拽的元素插入到空白节点的位置
                  ul.insertBefore(obj, blank);
                  // 删除拖拽样式
                  obj.removeAttribute('style');
                  // 删除空白节点
                  ul.removeChild(blank);

                  document.onmousemove = null;
              };
              return false;
          };
      }
  })();