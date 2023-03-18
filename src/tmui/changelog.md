---
title: 关于tmUi3.0的更新日志
---

<dirtoc></dirtoc>

##### 开发指南 tmui.design

# TMUI 3.0 by tm-vuefity 3.0

### :couplekiss: 更新日志
## 3.0.9（2023-2-13）
* **[新增组件]tm-adsorb,吸附器,主要功能：随意拖动后会在屏幕两侧自动吸附。也可以关闭吸附功能，达到任意拖动。nvue使用Binding，非nvue使用wxs实现，请注意兼容**
* [修复]tm-button,属性fontColor失效
* [修复优化]tmFilterMenu组件在作为悬浮时是可能展开后内容位置不对，因此增加了fixed属性，用于悬浮时使用，让本组件跟随屏幕滚动，自动吸附顶部展开条件筛选菜单。
* [优化]tm-slide-switch，现在已经可自行设定rightWidth宽度了，即展开的宽度，不再是固定值。
* [修复]tm-col,在vue页面(nvue不受影响)时内容未能100%撑开。
* [修复]tm-form,在nvue页面(vue不受影响),布局为竖向时，标题内容过长时不会自动断行。
* [修复]tm-calendar-view,tm-calendar,日历范围忘记引入函数了。导致范围选择报错.
* [修复]tm-city-picker,增加cityLevel，城市选择级别，这个功能一直都有，但我忘记放出来给大家用了。导致文档写了，但实际用不上。
* [修复]tm-rate,单词错误，导致监听变量失败，赋值失败。
* [修复]tm-picker,tm-time-picker内部参数单词拼写错误。
* [修复]tm-images，的loadIcon,errorIcon两个属性未启用的问题,同时增加了load插槽
* [优化]virtual虚拟列表增加top插槽，固定某个内容跟随滚动在顶部。具体见文档。
* [优化]tm-input,增加searchFontColor搜索按钮字体颜色.
* [优化]tm-button,目前删除了授权的快捷功能，因为微信收回了获取头像昵称规则。
* [修复]tm-more,util.ts见：[gitee pull](https://gitee.com/LYTB/tmui-design/pulls/106)
* [优化]tm-dropMenu，增加haveArrow是否显示箭头。
* [优化]tm-upload,新增：fileType，选择图片的场景值，默认为，相册和相机 中选择。
* **[大改]tm-table,表格已发生重大改变，不向下兼容。请注意备份老版本并谨慎升级本组件。**
* [修复]tm-keyborad,数字键盘在vue页面发生布局错误。
* [修复]tm-translate，在非nvue端未触发开始和结束事件。
* [修复]tm-tag，在开启可关闭选项时，关闭后，还占位了空间，并未真正消失。
* [优化]tm-filterMenu-item，属性为动态响应可修改。
* [优化]tm-action-menu，修改了样式
* 修改部分示例
## 3.0.89（2023-1-9）
* [新增]tm-color-view，颜色选择器。
* [新增]tm-sku,商品属性选择器
* [重要优化]tm-chart图表组件，从3.0.89开始已经兼容nvue平台。并且在nvue下性能是最棒的。具体看文档。同时去除掉了stop事件，允许页面事件穿透。
* [修复]tm-picker,tm-picker-view,属性dataKey因为在微信平台与官方字段关键字重名，导致设置失败，现在新增了一个mapKey与dataKey作用相同，向下兼容后续建议大家使用mapKey
* [优化]tm-button重新布局，减少嵌套，利于原生的功能。
* [优化]tm-grid,针对nvue调整优化了宽度的计算。防止部分手机缩放，有概率会断行。更改了角标位置。
* [优化]tm-calendar-view,nvue页面可能某些手机在切换为月，年季度时，会断行。
* [修复]tm-carousel，在最新的sdk中，轮播索引对齐样式在nvue端丢失。
* [修复]tm-scrollx，在vue页面对齐方式失效。
* [优化]tm-collapse-item
* [优化细节]tm-input，对后缀和前缀图标点击区域稍微扩大，图标也增大，过小无法点中触发事件。同时对边线，图标颜色切换，聚焦时的转换增加动效，让切换变得更为自然。
* [优化]tm-radio，tm-checbox,优化选中图标大小，以及对齐布局的改变。
* [优化]tm-rate,增强了选中的动效[nvue颜色过渡效果没有，但弹跳效果是有的]。
* [修复]tm-tabs,在vue页面时，如果标题过多，会断行。
* [重要优化]tm-row,tm-col使用了全新的设计思路使得布局变得非常的简单。但特别注意：从3.0.89开始不会向下兼容.请把之前的flex-x，中的x写在tm-col属性:col="x"来兼容升级。原有的row,gutter属性被取消，请在tmcol上重新写入margin属性实现兼容。
* 此次的tmrow,tmcol优化后，让所有端的差异被抹平。使用变得一致。并且单独设置了borderColor,borderGutter属性来控制边线，颜色，让你用tmRow,tmCol布局应用变得非常简单（尤其是大面积的表格布局边线，边距的处理）
* [优化细节]tm-image,新增一项体验功能，当图片出现了加载错误提示时，可以点击错误提示区域让图片重试加载。
* [重要优化]tm-floatButton,悬浮按钮已经重构，让各个平台兼容性更好。减少多余的代码。
* [调整]调整了主题渐变值的计算。
* [修复]tm-upload，批量上传时，因设定了双向绑定导致状态错乱，阻止了后续上传。现改为当所有文件执行完动作后，再实行数据同步。
* [优化]tm-segtab，调整了过渡动画，显得更为自然有趣。
* [优化]tm-tree,补全node-click事件，同时作了调整，当标题为会父节点时，现在点中会展开节点。如果是最终子节点，点击会选中当前节点。
* [修复]tm-alert,在微信小程序中点击关闭后，还会占位空间。
* [优化]tmradio,tmcheckbox选中的同步速度【针对部分安卓机】
* [优化修复]tm-cascader，补上cell-click事件，忘记写上去触发了。
* [优化]tm-button,补齐在按下或者鼠标悬浮时没有样式变化的问题
* [优化]好多人看不明白自定义图标，现在把规则重新写了一次，并且写了详细的自定义图标的方法。[详细使用方法](https://tmui.design/doc/com/Icon.html)
* [插件优化]同步了mp-html作者的更新，更新了tm-html组件一些bug,目前3.6.15+以上可以支持nvue页面渲染html了。
* [优化]tm-modal，为了打开和取消事件处理方便，在使用ref方式打开.open时，支持返回Promise，then为点击了ok按钮事件，catch为点击了取消关闭（包括点击遮罩，同样会执行到catch中）。具体见文档示例。
* [修复]tm-more,在vue页面(nvue不受影响)，更多图标与文字未上下对齐
## 3.0.88（2022-12-15）
* [重要]uni sdk 3.6.13+,alphat 3.6.11+ ，更新导致本demo运行失败，现已修复，如果你是老项目升级最新sdk[3.0.0-3061320221209001]，请在app.vue补齐temlate标签，否则无法运行。
* [增强] tm-sheet对margin,padding增强现在规则如下（向下兼容，不用担心升级）：[x]时表示四周的间隙,[x,x]时表示水平，上下的间隙，[x,x,x]时表示左，上，右，下：0的间隙,[x,x,x,x]时表示：左，上，右，下的x间隙
* 此项增强，同样适用于以此为组件的增强：比如tag,button等等支持这两个属性的组件大部分支持此优化。
* [修复]tm-text,tm-icon行高问题，导致相关的部分组件对齐丢失。
* [重要]tm-slide-switch,舍弃了原有的原生组件movearea用法,改动自己写的手势,如果已用本组件的,请适配后再升级.本次更新主要是提高流畅度性能和使用的体验.
* 升级后:滑动方面nvue采用bingdx,丝滑流畅的滑动体验.非nvue采用wxs,丝滑般的滑动体验.因目前的sdk版本uni有自身的bug,导致底部的可滑动区域被我固定在了120px的宽度,且不可更改.如果
* 需要更改自定宽度,请自行修改源码.底部菜单方面:使用插槽,取消了原有的属性控制,这样大家布局更为自由,不再局限.
* [增强]tm-keyborad键盘,新增属性:maxLength,最大长度,如果设置了值,当前输入内容达到该值时,将触发success事件,并且无法再继续输入内容
* [增强]tm-icon 新增:rotate是否允许单独控制图标旋转的角度, rotate-deg:图标旋转的角度
* [优化]主题计算中的border-color,渐变配色,边线的计算逻辑稍微调整了下.
* [优化]tm-codeinput,优化了样式,开放了text,outlined样式属性
* [优化]tm-card,修改了默认的内边距为24,之前是16
* [修复]tm-side-menu内部类名写错了.
* [优化]tm-radio,tm-checkbox开放了outlined属性,设置为true可用于镂空效果.
* [修复]tm-upload新增的排序功能在微信小程序端不显示,原因是:sdk渲染templeat渲染成为一个空view导致的(其它平台不存在,只有微信有.具体原因不明)
* [优化]tm-button文字图标对齐问题
* tm-side-menu属性sliderMenu拼写错误,修改为sideMenu,如果已使用,请根据错误日志及时修正.
* [修复]tm-calendar-view在设置dateStyle日期样式时,范围模式样式丢失.在单选时,在小程序样式有残留.
* [修复]tm-upload,因为上个版本增加了排序功能,类多写了个,导致nvue端样式走位.
* [优化]调整tm-grid,的角标位置在内容的右上一点。
* [增强]tm-float-button,增加属性：disabledScrollTo：默认true禁用，是否开启置顶功能，scrollTo：[置顶参数见官网](https://uniapp.dcloud.net.cn/api/ui/scroll.html),nvue不支持。
* [增强]tm-notification,show参数中,开放了color属性,现在允许通过show来传递color改变弹层的颜色.(注意:我再提醒下从3.0.8x开始color可以不用是主题,可以是任意16进制颜色值.)
* [优化]加所牵涉到加载组件的图标更换成了tmicon-shuaxin图标.
* [修复]tm-time-view,当显示其它不同属性时，会导致选项值不正确。[感谢](https://gitee.com/LYTB/tmui-design/pulls/94)
* [增强]tm-comment，新增属性autoFormatTime是否自动格式化处理时间[见此，感谢](https://gitee.com/LYTB/tmui-design/pulls/93)
* 修改文档错误部分.
## 3.0.86（2022-11-29）
* ------------uni SDK Bug提醒,因官方未修复,以下为记录我踩过的坑----------------
* uni sdk bug集合见我提交的ask 请前往[UNIASK](https://ask.dcloud.net.cn/question/158252)
* ------------正文日志开始----------------------------------------------------
* [极其重要优化]tm-form表单验证,此次优化对标大厂逻辑思维,摒弃了常见的组件绑定验证(包括uni的也是如此缺点).更新的逻辑如下:
1. tm-form绑定的模型数据,与form-item中的filed字段绑定,进行验证
2. 解藕 tmform中的模型数据与组件绑定验证(之前是需要通过特定的组件进行验证,比如输入框,上传组件等等).此次更新解藕,不与组件绑定
3. 任何数据都可校验,form-item内可以放置任意组件,布局,也不影响校验,与只filed绑定
4. 优化后,也彻底解决因校验,导致输入框内容闪烁,过快时丢失字符.
5. 校验速度加快.error标签显示,不再页面布局闪动,影响视觉的感观.
6. 具体见form页面demo代码,更为简洁了.
* tm-carousel在h5,小程序端的标签对齐有些差异.
* [修复]tm-steps在微信小程序中错乱的问题,同时为了解决各兼容问题在tm-steps-item增加了属性:width,单独控制各个进度组件的宽度.
* [优化]tm-navbar增加属性isPlace,是否占位内容,方便做透明导航背景内容
* [优化]tm-input增加属性placeholderStyle,方便定义占位符的样式
* [优化]tm-modal,ref调用方法open,允许传递参数,modal绑定的ok,cacel事件触发时将会带回open传递的参数,方便逻辑页面交互.
* [修复+优化增强]tm-picker,tm-city-picker在点击确认时,触发confirm事件时,如果当前默认为初始值(起始未选择值),传递的参数为空值.
* [修复+优化增强]tm-time-view，本组件已重构，在微信小程序端显示将更为流畅,并添加了选中和未选中过渡时的指示，以让用户知道是在滑动中还是已经完成选中。并且已经弃用渐进式渲染。（之前是渐进式演示，肉眼可见从左到右渲染过程）
* tm-time-view此组件，同时修复uni sdk3.6.8开始，未知原因，在nvue页面，赋值时间时，页面不会变化，必须通过页面强制刷新ui才可显示，现已修复兼容3.6.8+以上sdk在nvue上使用本组件。
* [修复]tm-action-menu,标题文字未居中.
* [优化增强]tm-button,form-type新增两个可选属性:'filterCancel','filterConfirm',主要用于在filterMenu组件中的提交和取消选项功能.
* [增强]tm-raido,tm-checkbox,默认插槽新增当前是否选中的属性checked,补上click触发事件
* [修复]tm-message,如果设置隐藏背景,导致内容位置出错.
* [新增]tm-filterMenu,下拉菜单过滤器,注意:本组件只提供外观框架支持,具体的逻辑选项等数据交由使用才自行处理.主要是考虑到下拉选项千奇百怪,各种各样的
条件筛选.如果我内部,集成,本组件将会超级大.因此,组件不集成任何数据逻辑,只提供框架.具体由你自己实现逻辑效果.
* [优化增强]tm-table因为安卓性能原因,导致部分安卓机在拖动时抖动无法使用.现在tm-table在app nvue页面采用了weex原生的list scroller+bingx布局,性能高超.建议本组件使用nvue页面
进行使用表格,nvue同样可以编译到小程序端和其它端.本组件作了全部的兼容.
另外本组件还增加了:固定左边和头部标题的功能.内容区域滚动上和左可固定,当然也可不显示.
* [增强]tm-form-item增加了两个属性:parentClass,align两个类的属性,具体用处见文档
* js工具库$tm.u下新增两个方法torpx，topx将数值转换为对应的rpx和px单位，方便大家单位间的转换。
* [修复]tm-collapse-item在nvue ios端点击可能会不触发收起的问题。
* [修复]tmRadio,tmCheckbox在vue(nvue不受影响)页面,插槽文字过多时,造成左边的按钮被挤压.
* [修复]tm-slider在vue页面(nvue不受影响)位置错乱
* [优化增强]tm-input加入了readonly属性，针对钉钉和支付宝因为输入框禁用字体变灰的情况，可用此属性代替disabled
* [优化增强]tm-overlay内容显示效果与背景动画同层属性contentAnimation，默认是关闭，开启后，背景的渐隐消失动画将会在内容层上一并实现，有助于内容显示和关闭时过渡的更自然。
* 同时增加了inContent属性，开启后嵌套弹层只会在父组件内部弹层，不会全屏弹层
* [优化增强]tm-drawer增加了inContent属性，开启后嵌套弹层只会在父组件内部弹层，不会全屏弹层
* [优化]stepper步进器输入值优化。
* [优化增强]tm-result新增,text是否浅背景,size尺寸大小设定
* [修复]uni.$tm.u.setClipboardData设置剪切内容时在h5端报错。
* [重构]tm-scrolly已经重构，可在正式生产中使用。
* [优化]优化tabs组件标题的角标位置与文字间距拉大一点。让角标处于右边上位置.同时新增属性:subtract,就是开启lineAni后,点击某项时,选中项位置会往前移动的数量,默认为2
* [增强]tm-tabbar-item新增属性:disabled,可以禁用当前项目,阻止链接跳转和触发功能.
* [增强]tm-model新增插槽:title标题栏,button底部按钮栏
* [增强]tm-icon,关于自定义图标方案已采纳如下:(见方案)[https://gitee.com/LYTB/tmui-design/pulls/77],也可以通过文档查看自定图标方法.
* [修复]tm-grid-item在vue页面,因为未与nvue对齐,导致断行.
* [优化]tm-keyborad-number键盘,不允许多次输入小数点.
* [增强]tm-scrollx新增ref方法:scrollTo,滚动到指定位置
* [优化]tm-countdown优化倒计时，的判断逻辑，方便配置验证码倒计时之类的应用。
* [其它]根据gitee上提出的issue需求和bug进行修复和增强，请前往[码云](https://gitee.com/LYTB/tmui-design/tree/master)
* [修复]tm-model弹层组件,cacel会触发两次,在微信上.(我有必要说下原因:产生的原因是uni sdk早期时刚兼容vue3时,安卓和ios无法触发事件冒泡,因此在自定组件上写了click和内部的一个click.stop,但后期uni修复了这个问题.然后ios微信小程序也支持这样子用.但是:安卓机微信端阻止不了冒泡,然后就产生了上面的问题).因此这里有一个坑:安卓微信端在自定组件上加事件修饰符是不起作用的.ios和其它平台是支持的.
* [优化]tm-picker系列补齐immediateChange属性。
* [优化]部分数据集比较多的组件,在监测变化方面进行了抖动设置,主要是数据多的组件,大家可能默认是一些其它数据,通过请求后,进行赋值或者变动赋值,连续的变动造成监测计算损耗大量性能,会造成表单组件过多影响页面显示的速度.
* [优化]在非nvue端动画组件,和相关的动画组件,取消了原先的animation动画api,改为使用纯粹的css动画效果,虽然两者效果其实是一样的,但必竟通过 animation接口设置,其实本质也是通过底层sdk进行的css设置到组件的style上.相比直接使用css更为直接,不经过这道处理.
* [优化]tm-calendar系列组件,日,范围修改了选中样式为圆形.其它样式头部已经修改.
* [优化]time-picker增加了title属性
* [优化]tm-badge增加:top,right属性,允许微调位置,整数,可以是负数.
* 一些文档,类型,属性的错误修正.

## 3.0.85（2022-10-20）
* 新增组件tm-html,富文本渲染组件，主要用来渲染html内容。具体注意事项见文档。
* 修改了tm-app,去除微信小程序下的警告setTabBarStyle.
* 修复tm-app在读取page.json中的导航和底部导航配置时出错的问题,导致如果配置了原生导航切换浅背景时,无法设置为Page.json中的样式.
* 修复tm-tag事件冒泡问题.
* 优化tm-radio.
* 修复tm-upload主题,未读取props.color配置,修复beforeStart以及beforSuccess函数返回true或者false无法设置文件状态的改变。
* 修复tm-input为textarea时字段未对齐的问题.
* tm-input新增 prefixColor,suffixColor，应用于前缀和后缀图标及标题色。
* tm-sheet新增url属性，如果提供，点击时自动跳转至该链接，方便做链接跳转，省得再套个nav
* tm-form-item,新增了transpren,round,desc 属性。方便单独控制一行的表单样式属性，达到个性化布局的需求。
* 修复tm-form中的tm-radio-group,tm-checkbox-group，手动对其赋值值，form表单的submit取值不正确
* 修复tm-more在未知版本开始，因为 写法上不支持，导致设置的height失效。
* 修复tm-checkbox-group严重bug，如果先赋值选中值，再改变checbox组件数据时，会导致数据无法选中，并且选中值被清空。
* 修改了默认的theme主题值。
* 非nvue模式字体格式调整为woff.之前为woff2因为 钉浏览器不支持。
* 修复tm-navbar中属性hideback逻辑错误，导致设置无法隐藏。
* 修复tm-pagination分页组件， v-model:current时手动赋值，无法改变当前页码。
* tm-divider添加click事件，点击分割线时触发。
* tm-tabs,tm-cell,tm-navbar添加了darkBgColor属性，在强制暗黑模式下设置自定义的颜色值。
* tm-cell新增titleColor，可以指定强制配色主题（如果不提供，采用主题color自动配色。）
* 优化tm-steps-item，tm-steps步骤条在nvue下显示。让其在布局中自动居中显示。删除属性：contentHeight，从此版本开始不再要求输入contentHeight来占位。
* 修复theme主题生成工具在生成具体色值时，某些色值无法生成主题，导致出现undefined。
  同时优化计算主题生成时:如果使用了outlined 同时又提供了text,将会产生浅色边框,只单独使用outlined产生深色边框,方便界面的搭配.
* 修复tm-scrollx，设置隐藏底部bar滚动条时，高度未减去此滚动条高度。
* 修复code-input组件在微信小程序，待输入字符不闪烁。
* 修复tm-city-picker可能选值不正常的bug.同时新增属性city,方便自定义城市数据.同时调整了文档说明,让大家更能理解.
* tmui-cli工具升级至1.1.0,新增在tmui use命令中,选择自己喜欢的包管理工具:npm,yarn,pnpm,cnpm来进行安装依赖
* 增强了部分组件props属性的ts类型检查,和类型提示.
* 修复tm-uplad属性maxFile失效导致无法限制上传数量
* tm-alert增加右边插槽功能,方便添加按钮操作之类
* 优化tm-picker,tm-city-picker组件的一些问题.优化后如果提供的正确的值,将会通过model-str自动反选并显示选中的字符路径(与arco的选择框类似),极大的方便表单的填写功能.
* 修复tm-picker关闭事件会触发两次
* 修复tm-image,添加自定义错误插槽时,图片成功会继续显示.
* 修复tabs,如果动态取tabs栏目时,首次为空时,会导致激活swiper模式.
* tm-calendar,tm-calendar-view新增了：按季度选择的模式
* 修复tm-indexes在非nvue平台.如果套入动态的其它组件内时,执行滑动选择索引值时,会不准确.
* 优化tm-message,现在你可以使用js连续调用并显示message组件的show了,不再限制,也不做防抖处理.方便日常加载数据连续调用显示.
* 优化tm-notification,现在你可以使用js连续调用show来显示组件,方便日常加载数据连续调用显示.
* 优化tm-tabbar层级过低问题.
* tm-comment新增authorFontSize属性.
* 更新部分错误文档
## 3.0.84（2022-9-26）
* [重要] 从uni3.6.1开始部分安卓模拟器运行本框架会经常性的空白.原因在于uni3.6.1开始对部分安卓模拟器的兼容变差导致.已知mumu网易模拟器会空白.作者使用的是夜神模拟器,正常.
* [重要] 从3.0.84起，color等相关需要颜色主题的属性，不再要求在theme.ts中预定义主题，而是直接可以提供16进制的颜色值。比如tm-button中的color你现在可写"#FF0000"或者"red"。将自动解析颜色值。
  当你提供的颜色非主题时，而是颜色值。会自动解析颜色值生成临时主题应用于所在的组件上。
* tm-scrollx,在非NVUE平台去除横向滚动条样式.
* tm-progress,解决可能在微信高分屏幕上初次渲染带来的矩齿问题.并针对安卓机器的差异性优化显示,减少部分机型的异常显示.
* tm-button如果配置了边线导致上下居中不对齐
* tm-indexes[重大升级]新增右侧导航可手势滑动选择,布局功能升级:同类或者官方索引组件,大多是要设定子项目的高度,或者只能提供列表式布局.这点应对复杂的索引(可能不是列表可能是复杂的布局)无能为力.
	经过这次的升级,即子项目你通过tm-indexes-item组件插槽布局,可以像正常的view布局一样随意的布局
* tm-action-menu修复了一处错误.
* 调整了颜色深浅的计算方法.
* 修复tm-dropdown图标未对齐。
* tm-card修复在vue页面内容不能够断行的问题。
* tm-form表单工具，现在重置时（指定的form表单类组件）将恢复到最初的值.
* tm-switch新增了两个字段：selected、unSelected允许你开关设置打开和关闭的值
* tm-upload新增配置属性：formName,用于设定上传文件的表单名称，默认为"file"
* tm-tabs修复开启swiper左右滑动时,无法触发change的bug.
* tm-stepper修复部分安卓机在Input上不支持type = "number"属性的情况下继续输入其它字符时,会被转译成NaN或者underfind的可能性.
* tm-button添加了一些qq上的属性.
* tm-picker修复在小程序中手动赋值时可能造成的延迟选中状态。导致可能选不中的问题。
* 修复在纯nvue编译模式下,图标字体丢失的问题.
* 修复深浅主题切换.或者首页首次加载时,app端的系统状态栏主题文字没有同步应用组件的沉浸式变化.导致系统状态栏文字出现与底色相同看不清.
* fetch请求,默认不再提供默认的content-type的值
* 修复tmui-cli工具创建的hbx项目路径资源引用错误.
* tm-image新增错误插槽error,用于自定义加载错误的提示
* tm-roll-notice删除了duration属性.新增speed属性(滚动速度)
* tm-modal 新增了:titleStyle,格式和正常写style一样的写法
* tm-waterfall新增ref方法clear,用于清空列表,当前列表需要重新赋值,清空原有时,需要调用些方法清空.清空后需要在nextTick里面重新赋值.
* [新增组件]tm-scrolly,见文档
## 3.0.82（2022-9-7）
* 此版本性能大幅度提升，针对安卓性能提升非常的明显。
* 特别声明下：以下组件在安卓nvue端有待优化：滑块组件tm-slider(如果大家有测试到异常的要吧提交到gitee上)
* 级联器tm-cascader新增ref方法：reFresh，方便动态加载数据后刷新同步。
* tm-tabs现左右滑动切换列表可以应用于生产了，已经兼容了全端，滑动表现已流畅（ios及android模拟器端已于头条对比过，无压力）。修复在h5端内容点击事件失效的问题。
* tm-barcode条形码，tm-qrcode二维码生成组件在nvue端对安卓端额外优化进行适配。
* tm-sign-board修复3.6.0 sdk和3.5.5sdk下在安卓端签名时位置的异常（我真的无语）
* tm-codeinput在nvue端修复了呼吸效果。
* nvue端tm-skeleton-line组件修复了骨架呼吸动画。
* 修复tm-icon组件nvue端，可能由于变量机制未回收导致ios和andriod程序的内存泄漏造成不同程度的卡顿情况。
* 针对nvue端，由Bingdingx动画全部切换成了Animation动画，手势动画继续保留为BingdxingX。
* tm-form-item 修复插入自定组件，非指定组件时，默认的标题校验值异常。
* tm-calendar 修复上个版本修改时，把确认事件给删除了，导致数据不同步，事件不触发。
* tm-overlay 修复如果外层套了父元素有间距，影响弹层的位置。
* 修改$tm挂载时机。因为部分人反映没有挂载成功。（只有个别人反映，我反正是成功的）。
* tm-action-menu修复安全区域丢失
* radio-group,checkbox-group新增了align属性，用于对齐，可选，左，中，右，见文档。
* 修复因全局只获取一次系统信息的缘故，在h5端未能检测窗口变化，导致一些弹层位置 异常。现在位置为响应式了。
* tm-image增加showMenuByLongPress属性
* tm-message新增：width，height属性。同时新增默认插槽替换自带的内容。
## 3.0.81（2022-8-29）
* 修改兼容了sdk 3.5.5。因为uni最新的sdk修复(改)了接口getSystem返回值的bug，我的组件同步要更新。之前因为为了个bug我不得不自己修复。现在他修复了，又会导致我的问题。无奈。
* 大量的减少代码的冗余，所有动画弹出效果向原生的渐隐对齐，关闭和弹出的背景动画与内容动画同步，显得更为流畅不突兀。
* 修复了因为uni plus+底层代码调用，导致部分安卓机型白屏的问题（非我所致，h5+本身的接口bug不兼容所有安卓）
* tm-form 开放了属性transprent，以支持透明背景，去掉背景色。
* 【重要】在h5端彻底解决了暗黑切换页面短暂的闪白问题，现在切换暗黑，导航致任何页面都将不会出现闪白，而是沉浸式原生暗黑效果。
* 【重要】针对QQ小程序，重要优化，现在已经可以和h5,微信小程序一样的流畅使用
* 修复tm-divider在上个版本修改中失效了。
* 修复tm-progress在nvue上 ios系统下圆形渲染背景失效的问题。
* tm-drawer新增：disabbleScroll是否禁用内容可滚动。默认为false
* tm-form-item,新增属性requiredTitleChangeColor，具体看文档
* tm-modal,gm-message等组件兼容了有些异常机型包括QQ小程序。
* tm-collapse-item新增titleSize设置标题字号属性
* tm-pagination增加了点按效果，以便提供更友好的点按反馈
* 【重要，如果你升级后有问题（如果你的代码在useTmRouterBefore中依赖了context,升级后这个值为null ）】修改router路由拦截,useTmRouterBefore勾子使用uni拦截器拦截,因此是早于页面切换前执行.
* tm-keyborad键盘优化了细节，点按按钮时效果会有明显的缩小和变浅，以增强按下的提示效果。车牌键盘输入增强：在第一个中文输入后自动切换到英文键盘方便车牌的输入。
* 其它组件代码逻辑优化修改,和近一周的修复 修改，优化了相关组件代码，使用是相关组件更流畅。
## 3.0.80（2022-8-17）
* 新增了35+新图标。
* tm-app新增了menu插槽，用来显示左滑覆盖页面的菜单，类似flutter的菜单。
* tm-weekbar新增model=week,custom和rowNumber,可以自定义显示几天为一周。
* tm-tabs,tm-tabs-pane增加了count属性，以支持在标题的右上角添加非dot属性，比如数字，文字。
* 优化了tm-drawer代码逻辑，防抖逻辑。
* 【修复】tm-time-picker右上解确认文本主题色未跟随主题。
* tm-avatar增加了unit属性
* 【修复】tm-divider在纵向时，real-color属性失效。
* tm-modal的calseable单词拼写错误，修正
* tm-progress增加圆环时的文字插槽title
* tm-picker做了一点让步。本意上我所有的picker中的model-str本意是为了大家方便省得通过索引（或者时间对象转字符串，比如element ui，arco就不提供这功能，只提供时间对象）来显示字符串，只是用来显示，并不能作为值来取。但实际上大家习惯用这个属性当作选中的值。
* tm-drawer 优化了显示方式，修复可能在低版本ios下显示异常的bug
* tm-pagination组件因历史遗留兼容，后期未跟进uni更新bug修复，导致点击事件重复，跳页异常。
* tm-button，修复因为我的类重名安卓系统下的hack某类功能，导致所有按钮组件在安卓小程序下点击时有浅青蓝背景。
* tm-tabbar 【修复】手动模式切换下，连续点击当前选中项会失去焦点。
* tm-keyborad 新增decimal：是否显示数字键盘时的小数点。【修复】键盘change没有被触发。同时优化，添加了按下的效果显示。【修复】当外部改变数据时，键盘标题未跟随变化。
  同时增加了showInputContent是否显示输入内容在键盘顶部。
* tm-checkbox,tm-radio添加了属性:custom，用于隐藏默认的选中状态，只显示插槽。
* 修复tm-popover在安卓上无法弹出（上个版本更新语法时未更改到。）
* tm-forme-item属性required设置为true，验证时，标题前面自动加上红*前缀。

## 3.0.78（2022-8-8）
* 【这是一个元气满满的版本，所有动画性能和相关组件进行了优化，生产必更新的版本！】
* tm-drawer 上个版本遗留的问题，确认和取消回调异常。
* tm-picker 修复因默认值忘记处理，导致提供默认值，无法初始选中。
* tm-cell 修复在vue页面下，右边文本如果过长会断行的问题。【nvue不受此影响】
* tm-translate修改了动画类型。
* tm-collapse-item优化了样式
* tm-tabs现在优化了左右滑动的动画和性能，目前采用渲染左右两列。其它的不渲染【非swiper封装，因此你可以大胆的放入任意组件】
* tm-button增加了unit单位【社区 Tycoon Song 提供】
* 【新增数据表格组件】tm-data-table 【社区 Tycoon Song 提供并维护】,注意：该组件使用了动态slot，因此在小程序上目前不支持使用该组件。
* tm-modal调整了防抖。
* tm-carousel修复上个版本遗留的问题，计数器失效。以及在真机上圆角失效问题。
* 修复在QQ小程序上报错，无法使用的问题
* tm-calendar,tm-calendar-view新增隐藏头部工具栏和底部按钮的属性。
* tm-calendar,新增弹层的圆角round属性。
* 修复弹层组件，在部分手机弹出时，键盘未收起，引起计算弹层的高度问题。
* 修复tm-model closeable失效的问题
* 大量优化动画性能的流畅度。
* 更改了大量代码适配支付宝，QQ小程序的兼容。
* tm-slide-switch优化滑动性能，现在看起来更为流畅了。
* tm-translate,tm-modeal等弹层或者动画组件全部优化了动画性能，现在更为流畅。
* tm-divider添加了字体大小属性
* tm-tabs的list结构体中新增了dot，dotColor,tm-tabs-pane相应增加了相关属性。用以在标题上显示角标红点。
## 3.0.77（2022-8-2）
* 【非常重要的功能】新增路由守卫。凡是本版本号以下的应用升级到3.0.77将会直接报错。请一定按照要求在src(或者hbx项目根目录)下[创建相关路由前置文件见文档](https://tmui.design/doc/JSTool/router.html)
* 修复tm-alert高度计算有误。
* 修复tm-comment组件authorColor属性失效
* 修改了tm-tabs,日志见文档，主要增加了底部导航线条动画，强化类型提示。
* tm-stepper更改特性见文档
* utils.ts修改了类型提示，增加了routerTo跳转方法，同时增加了更新了ts类型提示
* tm-action-menu修改一些问题,及更新了样式。
* tm-overlay修改了一些问题
* tm-badge修改了在vue页面的问题，见gitee
* tm-calendar,tm-time-picker等弹层组件，修改了ref方法引入方式，正式采用了vue3推荐的方法，去除了原先的proxy方式。后续组件将逐步淘汰使用proxy方案。而是采用vue3 ts推荐方案，这样ref方法可以得到ts类型推导的提示,同时消除了红波浪线。
* tm-collapse,tm-collapse-item增强了功能，具体见文档修改说明。
* tm-drawer修改了防抖，修改了一些其它代码问题
* tm-tabaar修复了跳转方法问题
* tm-upload增加插槽icon，用来自定义上传图标的上传提示
* utils.ts中的getWindow方法更新了计算方案。现在可以在任意位置使用了。不需要在onMounted中使用。
* tm-navbar添加了back挂载事件beforeBack，可以在返回前做异步/同步方法。同时增加了hideBack，可以隐藏自带的返回图标。
* tm-result增加了整个组件的点击事件，以及是否禁用此事件的属性。
* tm-modal修复在vue页面，第二个按钮异常的情况。
* tm-drawer增加了标题插槽title
* tm-tabbar增强，新增了属性active,和事件change。可以通过双向绑定v-model:active来控制选中的项。
* fetch请求中request中的beforeFun会预执行，如果返回为false，将中止请求。
* 修复了许多代码细节（微信群，和gitee上提到的）问题,因这次没有记录详细的组件修改日志，具体有些修改细节体现在文档中了。
## 3.0.75（2022-7-23）
* tm-app【重要更新】删除了自带的tabr属性。从这个版本开始，本框架将自动读取你的pages.json下的tabBar下配置的相关设置：比如选中色，背景色等，如果未设置将启用框架自带的配置色。
* tm-tabs 【重要功能】新增了swiper属性，可开启内容左右滑动切换tabs，兼容全平台，不用担心兼容问题，组件内部非swiper组件。
* 【重要】现在你输入uni.$tm将会有全局提示本库的所有方法以及参数类型，省得看文档或者肓猜了~
* tm-switch修复间距没对齐的问题,优化点击切换区域为整个组件区域。
* tm-coupon[优化]按钮大小。
* tm-app【修复】在app端默认为一屏时出现多余的滚动间距。
* tm-overflay【修复】在app端弹层时，高度计算有误，导致底部按钮被安全区遮挡。
* tm-modal,修复可能在安卓真机上触发ok事件造成穿透触发两次,修复在sdk 3.5.0以上时，加载时由于uni的问题造成字体偏移，帮加强了下使用行高控制。
* jstool工具新增：toast，getWindow（统一各平台返回安全区高度和宽度，大家可能都知道如果使用uni自带的返回的高度，需要自己进行繁锁的计算和加减，这里我抹平了差异）
* tm-drawer新增了一个unit属性，仅支持px,rpx,新增了zIndex层级
* tm-icon修改了行高的配置，默认为字号大小为行高，解决可能在不同平台出现的对齐问题。
* tm-dropdown【修复】在安卓上的类型异常，以box裁切问题。
* tm-segtab【修复】在安卓端nvue页面时，计算精度超长了一定小数点位时，安卓侧计算出现了紊乱。
* 【新增组件】tm-scrollx 横向滚动条，用于兼容全平台时使用，显示自定的导航滚动样式色彩
* tm-picker【修复】字段dataKey失效。
* tm-grid【修复】设置的宽度无效。
* tm-sheet【优化】调整了默认的上下间距，为常用的12间距，横向间距不变。
* tm-stepper【修复】点按时，如果设置最小值，还能继续。优化后，如果超过最大或者小于最小值，继续点按将会被重置为最小或者最大值。
* tm-button【修复】round为0时无法取消圆角，现在规定设置为-1时，即为0圆角。
* tm-action-menu【修复】圆角问题。同时去除了半磨砂效果，原因在h5端会出现线缝，影响美观。
* tabbar【修复】在MP小程序端，如果手机出现安全区域时，内容居中，而不上往上对齐，导致凸起的按钮偏下。同时删除tabbar 的click事件，因为事件穿透问题导致混乱故去除，不影响整体功能。
* tm-table【重要更新】请认真阅读文档使用。新的功能增特性有：单元格可定制样式，定制横向样式，和纵向列样式，纵向列头，增加排序功能（只对纯数字或者纯字母有效排列），单元格数据类型新加：按钮和文本两种
* tm-translate,tm-message,tm-drawer等全系动画优化在微信小程序下的表现。
* tm-col【修复】在vue页面对齐失效。NVUE页面不受此影响。
* tm-cell,新增rightTextSize右边文字大小。
* tm-watermark水印修复兼容问题---[来自社区Tycoon Song维护]
* tm-collapse【修复】在vue页面中多次嵌套后内容展现异常，NVUE页面不受此影响
* 优化了tm-picker，tm-city-picker,tm-time-picker系列弹层组件高度和代码。
* 文档的更正
* 官网已经公布赞助者名单，并不断更新，如果对你的项目有帮助请支持赞助我吧！
## 3.0.74（2022-7-18）
* tm-picker-view 【优化】当项目文字超过7个时，自动把文字缩小，以免挤满单元格。
* tm-button 【优化】新增small尺寸，现在有：mini,small,normal,large,block可选。同时修改了一些默认的样式尺寸属性。
* tm-app【优化】添加了属性：darkColor，用来设定自定义的暗黑下的背景色值（只能设置为颜色值，而不是主题 。）
* tm-dropdown优化了属性类型设置错误
* 一些代码上的优化。
## 3.0.73（2022-7-15）
* tm-icon增加了unit单位属性【社区 ：tycool Song 贡献】
* tm-text增加了unit单位属性【社区 ：tycool Song 贡献】
* tm-sheet【修复】计算宽度问题【社区 ：tycool Song 贡献】
* tm-image【修复】计算宽度问题【社区 ：tycool Song 贡献】
* tm-navbar【增加了unit】单位属性,方便宽屏使用时，字号过大时，通过此属性设计单位【社区 ：tycool Song 贡献】
* fetch请求工具，【修复变更重名问题】。
* tm-overlay【修复】导航设置为全屏时，判断出错，调用了top导致内容往下掉了44px.请大家及时 更新（如果用到了全屏页面）
* tm-sign-board【修复】在h5端失效的问题，【修复因sdk 3.5.1更新了canvas的event的返回参数与之前版本不一致，导致本组件在nvue上失效！！！无奈】
* tm-form【严重】【修复】校验问题。
* tm-grid【修复】showBorder,不起作用的bug问题。
* 【新增组件】tm-watermark ，由【社区 ：tycool Song 贡献】,但目前作者本人未对其审核适配到全平台，目前仅web/h5可用。
* tm-roll-notice【修复】在小程序端断行的bug
* tm-segtab【优化】对齐相差1px像素的问题。
* 其它代码优化

## 3.0.72（2022-7-9）
* 因sdk351导致tm-dropdown报错现已修复。并优化，美化了该组件，现在更为美观了。
* tm-tabbar-item【修复】公共属性缺失，导致投影，渐变失效的bug，现在凸起按钮，可以设置渐变了。
* tm-modal优化了样式细节
* tm-float-button主按钮添加了一个默认的插槽，用于自定义主按钮内容。
* 核心主题计算参数调整。
## 3.0.71（2022-7-8）
* uniapp官方已发布3.5.1，将及时根据更新日志更新本组件一些新特性。
* movable-area在sdk 3.5.1版本新增了一个属性动态disable，我立即更新了tm-slide-witch组件的问题，现在你用力往左拉将会动态阻止你向左偏移过多距离的问题。
* 因新的sdk支持在h5中使用hover-class。将使得pc web操作变得可有指向性。我也跟进更新。
* 新的sdk修复了ref的bug，支付宝，百度们可试下本组件pcker是否正常了，建议大家及时更新版本sdk.
* 因sdk3.5.1更新了IOS端nvue bindingx等，导致tm-switch开关动画异常。现已修复。
* tm-icon去除默认行高，否则导致排版偏上。
* tm-tabbar修复在安卓上出现裁剪的情况
* 【新增组件】tm-barcode 条形码，用于产品，打印场景。支持的码制众多，有需要的同学可以使用。
* tm-roll-notice删除一个小问题
* tm-form-item,新增：showError控制（在验证失败时是否显示错误信息提示），同时新增rules属性规则支持数据校验对象。旧版本升级后，请检查tm-form校验是否有问题，如果有问题请按照新文档使用。
  理论上tm-form是向下兼容了的。
* 其它一些问题的修改

## 3.0.7（2022-7-5）
* tm-tag新增fontColor属性，默认为空即自动配色。
* 框架内部增加了小程序分享
* tm-tabar增强了类型错误提示。
* tm-tabbar-item增加了属性：data，自定绑定数据到项目上。方便在beforeClick函数体内调用当前自定义数据。
* tm-input type="texarea"时同步了官方的一些属性。同时在demo示例了添加了文本域换行的例子。同时修复因uniapp自身的输入框bug（出现password属性即可显示）导致安卓端无法换行
* tm-alert,新增showDot属性，默认为false,是否显示底部序号数字。
* 【新增组件】tm-sign-borad,签名板,使用见文档。
* tm-divider,新增属性realColor，是否使用原始色值
* tm-image新增close事件，当关闭图片时触发。请注意与delete事件的区别。
* tm-qrcode新增ref方法save，保存当前二维码图片
* 【新增组件】tm-roll-notice，滚动消息通知,使用见文档。
* tm-form【优化】表单在重置时，在小程序平台，可能造成概率性未重置到默认初始值。而是被清除至空。
* tm-float-button 【修复】主按钮在微信小程序下图标颜色和文字颜色未跟随主题适配颜色。
* tm-collapse 【优化增强】，新增iconPos属性，展开的图标位置，可选left,right
* tm-collapse-item 【优化增强】，新增leftIcon,leftIconColor标题前图标。现在标题不限制长度和行数。
* tm-button,增加了fontColor属性，默认为空，自动配色
* 【新增组件】tm-coupon，优惠券，使用见文档。
* tm-tabs一个兼容性问题
* tm-tabbar兼容了appvue页面
* cssTool文档错误更正
* cssTool新增类：flex-row-center-between 上下居中，两边对齐。
* jsTool增加了fecth网络请求工具。
## 3.0.62（2022-6-28）
* 因uniapp 3.5.0.20220623-alpha sdk版本起渲染调整，在安卓端elevation属性将失效。然后同步所有平台的投影属性为box-shadow写法。导致布局错乱，特紧急发布新版本跟随新的sdk更新，支持新的特性。
## 3.0.61（2022-6-23）
* tm-input 优化校验逻辑
* tm-app 修复在nvue下，设定主题时，可能会发生概率性报错的问题。
* 紧急修复一个逻辑问题，请大家及时更新新版本。如果是已安装应用请先卸载再安装。如果是调试应用，请也卸载再重新编译到基座（就是老的基座和老应用要删除重新安装。
  包括小程序的所有平台，需要先清除本地应用数据再重新启动。）
* 非常抱歉！
## 3.0.6（2022-6-23）
* tm-button 【修复】在表单组件中，如果当button为loading时，还能触发提交表单事件。
* tm-countdown 【修复】当初始时插槽中未能正确返回当前是否完成的数据。
* tm-input 【修复】上个版本未能加上focus属性。
* tm-message 【修复】3.0.5版本引出的关闭问题。
* tm-checkbox,默认插槽名称default已删除（不是删除这个插槽）。因为uniapp的bug。不能在插槽中写入数据和写默认的name="default"，否则不兼容微信 小程序。
* 【uniapp bug】修复兼容pinia因为uniapp的vue页面bug，导致在nvue和vue页面混用或者纯vue页面时，会造成白屏，或者其它出现pinia未引入的问题。
* 【uniapp bug】修复兼容uniapp的uni.getSystemSync()函数在nvue页面调用时，如果出现在weex调试时，会造成获取不到系统信息时，造成页面崩溃。
* tm-form-item 优化
* 其它的小问题修复。
* 文档的修正和完善。
## 3.0.5（2022-6-20）
* tm-more 【优化修复】在pc端显示异常的样式问题。
* tm-button 优化样式，修复文字不居中的问题。
* tm-upload 【优化】添加了常用操作的ref函数方法，比如手动调用：上传，停止上传，清除文件列表等等。
* tm-time-picker ,tm-picker 等选择器组件已经兼容暗黑模式。
* tm-message 【修复】在原生nvue页面弹出时，概率性出现重复播放动画的问题。（其它平台正常）。
	[优化]在TS语法上的提示，已经为参数添加了interface类型提示。以增强代码书写的严谨性。
* tm-picker 【修复】confirm事件第一次触发时未返回索引的bug.
* tm-radio 【修复】允许value为true.
* tm-skeleton-line 【优化】自定骨架屏组件，添加了个圆角属性round。
* tm-avatr 【修复】在web端开启trigger时，鼠标移上去未出现手形手势。
* tm-input 【优化】添加了foucs属性，以便初始使用时自动获得焦点。
* tm-notification 【优化修复】当label为空时，默认不显示。更新内容时自动显示，或者手动调用显示。
* 【核心】主题核心驱动参数调整优化,主要调整渐变配色，以及某些色域值过高饱和度时，文字配色过浅，不易于阅读。
## 3.0.4（2022-6-13）
* 【重磅新增】i18n国际化配置，简便封装，降低配置难度，抹平全平台差异，不破坏原生国际化配置,不管是原生nvue还是小程序，亦是h5平台，统一调取方法，使用更简单。
* 【重磅新增】这个版本开始，已经可以自动切换主题配色了。相关的组件主色调会跟着全局的主题色切换，而跟随切换。
* 【重磅新增】这个版本开始，你可以手动在交互中添加主题并应用整个应用，比如让用户自定主题，而不是使用默认的主题，很爽吧！。
* tm-tabbar-item 【重磅新增load属性】当此值为true时，图标会变为加载中效果。
  同时如果提供了beforeClick异步函数，再没返回结果前图标同样是处于加载动画，加载中，点击事件效果不起作用。
* tm-tabbar-item 【修复】修复在安卓上凸起按钮被裁剪的问题。
* tm-app 【优化】app端，暗黑和亮切换在安卓下底部虚拟按钮区域的颜色与主题适应。
* tm-calendar 【优化】样式视觉。
* tm-tabbar 【优化修复】底部安全区域自动适配，只有showSafe为false时，自动适配。showSafe为false时，整体高度未减掉安全区域高度，并调整了整体的高度为60，之前为50.
* tm-keyborad 【优化】底部安全区域高度的适配。
* tm-form 【优化]输入框组件在输入内容后的校验，通过代码方式主动赋值时再次进行检测校验。
* tm-message 【修复】在nvue中的一个小错误。
* tm-upload 【修复】在tm-from校验中错误的逻辑判断。
* tm-drag-list 【修复】在微信小程序下拖动失效的问题。
* tm-navbar,tm-sheet 【修复】在ios下磨砂文字色彩问题,当前所有组件应用磨砂效果时，背景色自动 启动text模式。如果想要纯背景色，请关闭磨砂效果。
* tm-input 【修复】其它值为null时，会通过校验。
* tm-time-picker 【修复】在h5端（其它平台正常）设置默认值时，显示不正确
* tm-float-button 【优化】现在主按钮你将不需要填写图标颜色了，将使用主题的推断色，以便于主题切换，暗黑切换时，自动响应更改文字色值。如果提供了：将强制使用你提供的值，那将不能获得响应变化。
* 完善相关文档教程
## 3.0.2（2022-6-8）
* tm-overlay 【优化】了背景视觉
* tm-action-menu 【优化】视觉
* tm-checkbox 【优化】取消选中时返回false而不是"",虽然相等但是在强===下是不相等的。
* tm-input 【优化】样式警告信息
* 【新增】tm-chart图表组件，采用了Echarts 5.3.2最新版本，性能更为强劲。注意如果要在nvue平台显示，请创建vue页面展现图表获得更好的性能。同时兼容PC端。
* 【新增】tm-navbar 标题导航栏
* tm-sheet 【优化】兼容vue页面。
* 【微调优化】了暗黑模式下的对比色，使得暗黑模式更具有质感与精致。
* 优化各弹层组件在h5,pc端的底部距离，防止被遮住。
* 【修复】tm-image单独开启预览时，无法预览的bug
* tm-action-menu 【优化】视觉效果，增加磨砂效果
* tm-input【优化】了样式，补齐了投影和渐变这些属性。
* tm-skeleton-line暂时关闭了，闪动效果，在ios nvue上会造成卡钝
* tm-collapse 取消了原有的渐显动画
* tm-picker增加了open打开,close关闭时事件
* tm-button 【优化】设置宽和高的便捷性，宽和高可以任意设置一个，不再强制宽度和高必须同时设置，设置任意一个值时，另一个未设置时将取默认的size值。
* tm-icon 【修复】在定义主题色彩为黑白灰时，切换到暗黑时，未跟随自适应，同时修复一个默认值的bug。
* tm-image 【修复】动态更改地址时，没有正确匹配。
* 【新增】tm-tabbar 底部导航栏
* 【新增】tm-slide-switch 左滑操作栏
## 3.0.1（2022-05-31）
* tm-indexes 【优化】引导层背景在暗黑模式下的背景使其与背景色区分开来。
* tm-message 【优化】其在在暗黑和亮色下的边框显示。修复其在切换暗黑和亮色系后，未跟随切换回亮色系的bug。所有平台增加了背景磨砂效果【安卓原生nvue不支持】。修复其在安卓原生nvue下高度有时失效的问题。
* tm-sheet 【优化】所有平台增加了背景磨砂效果。属性为：blur.设置为true后，自动虚化背景。【安卓原生nvue不支持】,ios原生nvue下是苹果的原生亮系磨砂。其它平台为css渲染的磨砂效果，样式可能有差异。
* tm-modal 【优化】修改了默认宽度，使其占比稍微大一点。
* tm-codeinput 【优化】会导致原生页面卡顿。因此去掉了原生的闪动动画，
* tm-progress 【修复】进度条在绘制圆形或者半圆型时丢失了背景色。
* tm-keyborad [优化]顶部输入文字的大小和背景色。
* tm-calendar 【优化】在暗模式下，周选择的同层背景色。优化了位置样式。
## 3.0.0（2022-05-28）
* 发布第一个3.0.0版本为公测版本
* 如果有遇到问题请提交bug至[Gitee](https://gitee.com/LYTB/tm-vuetify-for-vue3)

