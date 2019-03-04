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