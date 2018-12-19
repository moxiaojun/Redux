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
