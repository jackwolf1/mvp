import deepAssign from 'deep-assign';

export default class Store {
    get state() {
        return {}
    };

    constructor(initState) {
        const newState = deepAssign(this.state, initState);
        Object.keys(newState).map(item=> {
            this[item] = newState[item];
        });
    }
}