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