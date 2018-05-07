import deepAssign from 'deep-assign';

export default class BaseStore {
    get state() {
        return {}
    };

    constructor(initState) {
        const newState = deepAssign(this.state, initState);
        Object.keys(newState).map(item => {
            this[item] = newState[item];
        });
    }


    setPost(data) {

        let temp = []
        for (var key in data) {
            if (typeof (data[key]) != "undefined")
                temp.push(data[key])
        }
        return temp.filter(item => { return item; }).join('/')
    }


}