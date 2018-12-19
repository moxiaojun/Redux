/**
 * 旧状态 {number:0} {list:[]}
 * 新状态 {counter:{number:0},todo:{list:[]}}
 **/
//合并reducers方法
// reducers = {counter:reducer,todo:reducer}
let combineReducers = (reducers)=>
    (state={},action)=>{//返回一个reducer
        let newState = {};
        for (var key in reducers){
            newState[key] = reducers[key](state[key],action)
        }
        return newState;

    };
export default combineReducers