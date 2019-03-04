## 需求

首先有一个需求是这样子的，有一个售票网站，有一个页面需求如下 ![](https://oscimg.oschina.net/oscnet/68aa60cda547e8f0f8232fc781de7f808dc.jpg)

卖的票有两种：成人票和儿童票，然后点击加减号可以控制儿童票和成人票的数量，规定一次团体购票中必须有一成人且最多买15张票，然后总数那儿会自动计算出总数来。

## 面向过程思路

这个需求可以说是很简单了，分别给四个按钮加点击事件，然后分别改变相应按钮的值，每次触发下计算总值就行了。代码如下:

```
<!doctype html>
<html lang="ch">
<head>
    <meta charset="utf-8">
    <meta name="keywords" content="">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <link rel="shortcut icon" type="image/png" href="favicon.png">

    <link rel="stylesheet" type="text/css" href="./css/bootstrap.min.css?2584">
    <link rel="stylesheet" type="text/css" href="style.css?1179">
    <link rel="stylesheet" type="text/css" href="./css/font-awesome.min.css">


    <script src="./js/jquery-3.3.1.min.js?8531"></script>
    <script src="./js/bootstrap.bundle.min.js?5511"></script>
    <script src="./js/blocs.min.js?3734"></script>
    <script src="./js/jqBootstrapValidation.js"></script>
    <script src="./js/formHandler.js?5028"></script>
    <script src="./js/lazysizes.min.js" defer></script>
    <title>Ticket</title>
</head>
<body>
<!-- Main container -->
<div class="page-container">
    <div class="bloc l-bloc " id="bloc-0">
        <div class="container bloc-lg">
            <div class="row">
                <div class="col">
                    <div class="row">
                        <div class="col">
                            <h3 class="mg-md h3-1-style">
                                总数
                            </h3>
                        </div>
                        <div class="col">
                            <h3 class="mg-md" id="total_sum">
                                25
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="bloc l-bloc" id="adult">
        <div class="container bloc-lg">
            <div class="row">
                <div class="col-md-3">
                    <h5 class="mg-md">
                        成人
                    </h5>
                </div>
                <div class="col-md-3">
                    <input type="button" class="btn btn-primary  btn-lg" name="addBtn" value="+">
                </div>
                <div class="col-md-3">
                    <h5 class="mg-md" name="value">

                    </h5>
                </div>
                <div class="col-md-3">
                    <input type="button" class="btn btn-primary  btn-lg" name="reduceBtn" value="-">
                </div>
            </div>
        </div>
    </div>
    <div class="bloc l-bloc" id="child">
        <div class="container bloc-lg">
            <div class="row">
                <div class="col-md-3">
                    <h5 class="mg-md" name="name">
                        儿童
                    </h5>
                </div>
                <div class="col-md-3">
                    <input type="button" class="btn btn-primary btn-lg" name="addBtn" value="+">
                </div>
                <div class="col-md-3">
                    <form id="form_5894" novalidate>
                        <div class="form-group">
                            <h5 class="mg-md" name="value">

                            </h5>
                        </div>
                    </form>
                </div>
                <div class="col-md-3">
                    <input type="button" class="btn btn-primary btn-lg" name="reduceBtn" value="-">
                </div>
            </div>
        </div>
    </div>
</div>


<script type="application/javascript">

    const ticketMax = 15;
    // 利用浅拷贝可以传递对象
    let adultValue = {value: 1};
    let childValue = {value: 0};
    const adultMin = 1;
    const childMin = 0;

    // 初始化视图
    const adultView = $("#adult");
    const childView = $("#child");
    adultView.find("[name=value]").html(adultValue.value);
    childView.find("[name=value]").html(childValue.value);
    $("#total_price").html(adultValue.value * adultPrice + childValue.value * childPrice);
    //添加绑定事件
    adultView.find("[name=addBtn]").on("click", function () {
        btnClick(adultView, adultValue, 1, adultMin)
    });
    adultView.find("[name=reduceBtn]").on("click", function () {
        btnClick(adultView, adultValue, -1, adultMin)
    }).attr("disabled", true);
    childView.find("[name=addBtn]").on("click", function () {
        btnClick(childView, childValue, 1, childMin)
    });
    childView.find("[name=reduceBtn]").on("click", function () {
        btnClick(childView, childValue, -1, childMin)
    }).attr("disabled", true);

    //统一的绑定方法
    function btnClick(view, valueObject, change, min) {
        // 变更值
        valueObject.value += change;
        // 绘制到视图
        view.find("[name=value]").html(valueObject.value);

        // 判断加减号状态
        view.find("[name=reduceBtn]").attr("disabled", valueObject.value == min);
        $("[name= addBtn]").attr("disabled", childValue.value + adultValue.value == ticketMax);
        // 计算价格
        $("#total_sum").html(adultValue.value + childValue.value);
    }

</script>
</body>
</html>
```

## 面向对象

同样的问题，用面向对象如何实现呢？

### 类分析

这里有两个类（总人数选择器、人数选择器），三个对象（总\\\*1、单\\\*2），对象之间的关系是总人数选择器由若干个人数选择器组合而成。总人数选择器当单人数选择器的值变化时会重新计算自己的总数，单人数选择器会在总人数选择器到达最大值时禁用加号按钮。

### 设计

1.  如何实现两个类 es6 class
2.  两个类各自的属性和方法是什么根据需求
3.  如何实现当XXX时 xxx的场景 监听者模式

### 代码

html

```
<!doctype html>
<html lang="ch">
<head>
    <meta charset="utf-8">
    <meta name="keywords" content="">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <link rel="shortcut icon" type="image/png" href="favicon.png">

    <link rel="stylesheet" type="text/css" href="./css/bootstrap.min.css?2584">
    <link rel="stylesheet" type="text/css" href="style.css?1179">
    <link rel="stylesheet" type="text/css" href="./css/font-awesome.min.css">


    <script src="./js/jquery-3.3.1.min.js?8531"></script>
    <script src="./js/bootstrap.bundle.min.js?5511"></script>
    <script src="./js/blocs.min.js?3734"></script>
    <script src="./js/jqBootstrapValidation.js"></script>
    <script src="./js/formHandler.js?5028"></script>
    <script src="./js/lazysizes.min.js" defer></script>
    <title>Ticket</title>
</head>
<body>
<!-- Main container -->
<div class="page-container" id="total">
    <div class="bloc l-bloc " id="bloc-0">
        <div class="container bloc-lg">
            <div class="row">
                <div class="col">
                    <div class="row">
                        <div class="col">
                            <h3 class="mg-md h3-1-style">
                                总数
                            </h3>
                        </div>
                        <div class="col">
                            <h3 class="mg-md" id="total_sum">
                                25
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
<script type="text/template" id="selector_template">
    <div class="bloc l-bloc">
        <div class="container bloc-lg">
            <div class="row">
                <div class="col-md-3">
                    <h5 class="mg-md" name="name">
                        成人
                    </h5>
                </div>
                <div class="col-md-3">
                    <input type="button" class="btn btn-primary  btn-lg" name="addBtn" value="+">
                </div>
                <div class="col-md-3">
                    <h5 class="mg-md" name="value">

                    </h5>
                </div>
                <div class="col-md-3">
                    <input type="button" class="btn btn-primary  btn-lg" name="reduceBtn" value="-">
                </div>
            </div>
        </div>
    </div>
</script>
<script src="js/oop/obs.js"></script>
<script src="js/oop/total-selector.js"></script>
<script src="js/oop/person-selector.js"></script>
</body>
</html>
```

监听者模式js实现

```
class EventObs {
    constructor() {
        this.handleFunc = {}
    }

    add(type, func) {
        if (this.handleFunc[type]) {
            if (this.handleFunc[type].indexOf(func) === -1) {
                this.handleFunc[type].push(func);
            }
        } else {
            this.handleFunc[type] = [func];
        }

    };

    fire(type, func) {
        try {

            if (arguments.length === 1) {
                let target = this.handleFunc[type];
                let count = target.length;
                for (var i = 0; i < count; i++) {
                    target[i]();
                }
            } else {
                let target = this.handleFunc[type];
                let index = target.indexOf(func);
                if (index === -1) throw error;
                func();
            }
            return true;
        } catch (e) {
            return false;
        }
    };

    remove(type, func) {
        try {
            let target = this.handleFunc[type];
            let index = target.indexOf(func);
            if (index === -1) throw error;
            target.splice(index, 1);
        } catch (e) {
        }

    };

    once(type, func) {

        this.fire(type, func) ?
            this.remove(type, func) : null;

    }

}
```

单人数选择器的实现：
```
class PersonSelector extends EventObs {

    constructor(name, value, min) {
        super();
        //初始化属性
        this.name = name;
        this.value = value;
        this.min = min;

        //初始化视图
        this.initView();

        //初始化事件
        this.initEvent();
    }

    initView() {

        let selectorTemplate = $("#selector_template").html();
        this.view = $(selectorTemplate);
        this.view.find("[name=name]").html(this.name);
        this.valueView = this.view.find("[name=value]");
        this.valueView.html(this.value);
        this.addBtn = this.view.find("[name=addBtn]");
        this.reduceBtn = this.view.find("[name=reduceBtn]");
        this.reduceBtn.attr("disabled", this.value == this.min);
    }

    initEvent() {
        //绑定事件
        this.addBtn.on('click', this.onAddBtnClick.bind(this));
        this.reduceBtn.on('click', this.onReduceBtnClick.bind(this));
    }

    onAddBtnClick() {

        this.value++;
        this.valueView.html(this.value);
        this.reduceBtn.attr("disabled", this.value == this.min);
        this.fire("valueChange");
    }

    onReduceBtnClick() {
        this.value--;
        this.valueView.html(this.value);
        this.reduceBtn.attr("disabled", this.value == this.min);
        this.fire("valueChange");
    }

    onTotalMaxStatusChange(beMax) {

        this.addBtn.attr("disabled", beMax);
    }

    getValue() {
        return this.value;
    }

    getView() {
        return this.view;
    }

}

```

总人数选择器的实现

```

class TotalSelector extends EventObs {

    constructor(totalMax) {
        super();
        this.totalMax = totalMax;
        this.view = $("#total");
        this.valueView = $("#total_sum");
        this.adultValue = 1;
        this.adultMin = 1;
        this.childValue = 0;
        this.childMin = 0;
        //是否到达最大值的状态
        this.beMaxStatus = false;
        this.personSelectors = [];
        this.value = 0;
        //初始化子组件
        this.initPersonSelectors();
        this.onPersonSelectorValueChange();
    }

    initPersonSelectors() {
        this.initPersonSelector("成人", this.adultValue, this.adultMin);
        this.initPersonSelector("儿童", this.childValue, this.childMin);
    }

    initPersonSelector(name, value, min) {
        let selector = new PersonSelector(name, value, min);
        selector.add("valueChange", this.onPersonSelectorValueChange.bind(this));
        this.view.append(selector.getView());
        this.personSelectors.push(selector);
    }

    onPersonSelectorValueChange() {
        // 计算总值
        this.value = 0;
        for (let i in this.personSelectors) {
            this.value += this.personSelectors[i].getValue();
        }
        this.valueView.html(this.value);
        // 查看总值状态是否变化决定是否通知
        let beMaxStatus = this.value == this.totalMax;
        if (this.beMaxStatus != beMaxStatus) {
            this.beMaxStatus = beMaxStatus;
            for (let i in this.personSelectors) {
                this.personSelectors[i].onTotalMaxStatusChange(this.beMaxStatus);
            }
        }
    }
}

$(function () {

    new TotalSelector(15);
});
```

## 比较

### 面向过程

1.  代码简单直白
2.  思路简单粗暴

### 面向对象

1.  代码结构清晰
2.  松耦合

从现在的结果看好像是面向过程更合适一些，但不要忘记程序员的天敌产品经理，

![](https://oscimg.oschina.net/oscnet/41d62cf3ac1bef7293a0ae8c6c1f950dc3f.jpg)

需求修改点如下: 1.限制客户每次最多买10张成人票、最多买7张儿童票 2. 增加婴儿选择器 初始值0、最小值0、最多买5张 3. 每种票价不同，成人$10 儿童$5 婴儿不收钱 4. 限制票数变为限制总支付金额不超过$300

试试分别基于两种方式那种好更改一些。 ![](https://oscimg.oschina.net/oscnet/ebf0ca0338053b763bc15c246fed91e49c5.jpg)

## 总结

面向过程是由技术推导实现的思路，更接近机器思维，就是我会干啥，当需求来了我把需求分成我会的各种步骤： ![](https://oscimg.oschina.net/oscnet/fdbe93e9b9d99ae72054f52cf8855c6da82.jpg)

面向对象则是一种自上而下，由需求出发最终落到技术上的思路，我先想好到底是咋回事，然后分好谁该干什么，最后再考虑每个部分怎么干： ![](https://oscimg.oschina.net/oscnet/4009f426c0996a9d4c70ac1abda1720a148.jpg)


[项目地址](https://github.com/LogosFu/js-oop "项目地址")
