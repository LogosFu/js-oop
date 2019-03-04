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