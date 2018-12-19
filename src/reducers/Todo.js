import {ADD_TODO, DEL_TODO} from "../actions";

let reducer = (state = { list:[] },action)=>{
    if (action===undefined) return state;
    switch (action.type){
        case ADD_TODO:
            return {list:[...state.list,action.value]};
        case DEL_TODO:
            let list = state.list;
            list.splice(action.index,1);
            //我们的状态具备不变性，每次应该返回一个新的对象
            return {list:[...list]};
        default:
            return state
    }
};
export default reducer;