## 学习Redux
- 1.redux应用场景和工作原理
```
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
```

- 2.redux+jquery应用
```
    import {createStore} from "./redux";
    import $ from 'jquery';
    const INCREASE = 'INCREASE';
    const DECREASE = 'DECREASE';
    $('#root').append(`
        <p id="counter"></p>
        <button id="increaseBtn">+</button>
        <button id="decreaseBtn">-</button>
    `);
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
    let store = createStore(reducer);
    console.log(store.getState());
    let render = ()=>{
        $('#counter').html(store.getState().number);
    };
    //当仓库里的state发生变化的时候，会重新执行render,读取最新的状态数据并更新视图
    store.subscribe(render);
    $('#increaseBtn').click(()=>store.dispatch({type:INCREASE,amount:3}));
    $('#decreaseBtn').click(()=>store.dispatch({type:DECREASE,amount:1}));
    render();
```

- 3.redux+react应用
```
    import React,{Component} from 'react'
    import ReactDOM from 'react-dom'
    import {createStore} from "./redux";
    const INCREASE = 'INCREASE';
    const DECREASE = 'DECREASE';

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
    let store = createStore(reducer);
    class Counter extends Component{
        render(){
            return (
                <div>
                    <p>{store.getState().number}</p>
                    <button onClick={()=>store.dispatch({type:INCREASE,amount:2})}>+</button>
                    <button onClick={()=>store.dispatch({type:DECREASE,amount:2})}>-</button>
                </div>
            )
        }
    }
    let render = ()=>{
        ReactDOM.render(<Counter/>,document.querySelector('#root'));
    };
    render();
    //当仓库里的state发生变化的时候，会重新执行render,读取最新的状态数据并更新视图
    store.subscribe(render);

```
 react组件内部应用
```
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import {createStore} from "./redux";
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

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
let store = createStore(reducer);
class Counter extends Component{
    constructor(){
        super();
        this.state = {number: store.getState().number};
    }
    componentWillMount(){
         this.unsubscribe = store.subscribe(()=>{
            this.setState({
                number:store.getState().number
            })
        })
    }
    componentWillUnMount(){
        this.unsubscribe();
    }
    render(){
        return (
            <div>
                <p>{this.state.number}</p>
                <button onClick={()=>store.dispatch({type:INCREASE,amount:2})}>+</button>
                <button onClick={()=>store.dispatch({type:DECREASE,amount:2})}>-</button>
            </div>
        )
    }
}
ReactDOM.render(<Counter/>,document.querySelector('#root'));


```