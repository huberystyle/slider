# slider
一个幻灯片效果的jQuery插件！

这里其实是slider的第二个版本了，这个版本允许在一个页面中多次调用这个插件，每个幻灯片都各自自动播放着，互不影响。
当然还有完善的地方，比如给它加一些缓动效果。

使用说明：

```js
$("selector").slider({
  bAutoPlay:true, // 是否自动播放
  interval:4000, // 每张图间隔时间
  bPrevNext:true, // 是否显示 '上一张' 和 '下一张' 按钮
  direction:"upDown", // 图片滚动方向
  bPagenation:true, // 是否相识页面
  pageStyle:"number", // 页面的格式 number or icon
  speed:400 // 滚动的速度
});
```

