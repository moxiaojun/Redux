import {INCREASE,DECREASE} from "../actions";
//state是状态数，可以是任意结构，每个仓库只有一个state
//action 是一个纯对象{type:'INCREASE',amount:3}{type:'DECREASE'}
let reducer = (state = { number:0 },action)=>{
    if (action===undefined) return state;
    switch (action.type){
        case INCREASE:
            return {number:state.number+action.amount};
        case DECREASE:
            return {number:state.number-action.amount};
        default:
            return state
    }
};
export default reducer;