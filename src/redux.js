//创建仓库
const createStore = (reducer)=>{
    let state;
    let listeners = [];//监听数组
    let getState = ()=>state;
    //向仓库发送action
    let dispatch=(action)=>{
        //传入老的state和action，返回新的state
        state = reducer(state,action);
        listeners.forEach(listener=>listener());
    };
    //订阅仓库内的状态变化事件，当状态发生变化后会调用监听函数
    //订阅方法执行后会返回一个取消订阅的函数，调用它可以取消订阅
    let subscribe =(listener)=>{
        listeners.push(listener);
        return ()=>{
            listeners = listeners.filter(l=>listener!==l)
        }
    };
    dispatch();
    return {
        getState,//获取最新的状态对象
        subscribe,//订阅状态变化事件
        dispatch
    }
};
export {createStore}