
## 项目要求

* **第一点** 使用ES6完成点赞+1功能组件的父类PraiseButton。
* **第二点** 开发子类Thumb，实现大拇指方式的点赞，并设置点击十下置灰。
* **第三点** 使用babel编译ES6代码，并使用System.js加载对应编译后的文件。
* **第四点** 将编译后的文件挂载为JQ的组件
* **第五点** Karma完成对点赞组件的单元测试
* **第六点** 完成对点赞组件的稀释，封装成函数式编程



## 点赞组件的绘制和点击置灰

效果图如下：
{% asset_img ClassName css绘制.png 两个div绘制点赞组件 %}

利用伪类，实现尽可能少的html结构进行图案的绘制，以提高性能
这里用1个div实现手掌和4个手指，另一个div实现手腕和大拇指
渐变色使用background-image配合linear-gradient实现
+1效果使用animation动画实现

``` bash
<span class="hide" id="animation">+1</span>
```

点击十下置灰色，使用了filter的grayscale灰度属性

``` bash
$('#PraiseButton').css('-webkit-filter','grayscale(1)');
$('#Thumb').css('-webkit-filter','grayscale(1)');
this.num = add(this.num);  
super.pop();
```



## 使用Babel编译并用万能模块加载器System.js进行模块化加载
使用System.js自带的babel插件：systemjs-plugin-bable
安装System.js和systemjs-plugin-bable到本地项目中
head标签引入，或者使用CDN

``` bash
<script src="./node_modules/systemjs/dist/system.js"></script>
```

body底部的script标签中配置SystemJS.config

``` bash
SystemJS.config({
    baseURL:'./',
    transpiler:'plugin-babel',
    map:{
        'plugin-babel':'node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build':'node_modules/systemjs-plugin-babel/systemjs-babel-browser.js'
    }
});
```




## 挂载为JQ的组件

使用$.extend()方法即可

``` bash
SystemJS.import('index.js').then(m => {
  //挂载到JQ上
  $.extend({
    PraiseButton: m.PraiseButton,
    Thumb: m.Thumb
  });
  // 默认初始化
  new $.PraiseButton().click();
  new $.Thumb().click();
});
```


## 进行单元测试
 使用karma测试工具，JS行为驱动开发测试框架--jasmine，无头浏览器phantomjs
首先安装各种依赖包

``` bash
$ sudo cnpm install karma karma-jasmine jasmine-core karma-phantomjs-launcher –save-dev
```

注：karma.conf.js文件中singRun默认是false，这样如果没有测试文件或者没有配置测试文件路径，karma start就会一直等待不出结果。可以改为true，这样可以出结果，显示执行0条哦。



## 对点赞组件的稀释
函数稀释常见的方法有： 防抖Debounce，节流阀throttling
我这里使用setTimeout来实现一个throttle方法

``` bash
throttle(method,context){
    clearTimeout(this.tId);
    this.tId = setTimeout(function(){
        method.call(context);
    },500);
}
```


## 封装成函数式编程
单独建FP/utils.js文件，存放纯数学函数，比如本项目的加1函数；然后在需要的页面中import就好。
``` bash
window.add = function add(num){
	return num+1;
}
```


GitHub地址: [GitHub](https://github.com/yllg/JS-QA)


