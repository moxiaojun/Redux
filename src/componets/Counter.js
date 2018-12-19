import React from 'react'
import {createStore} from "../redux";
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
let mystore = createStore(reducer);
export default class Counter extends React.Component{
    constructor(){
        super();
        this.state = {number: mystore.getState().number};
    }
    componentWillMount(){
        this.unsubscribe = mystore.subscribe(()=>{
            this.setState({
                number:mystore.getState().number
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
                <button onClick={()=>mystore.dispatch({type:INCREASE,amount:2})}>+</button>
                <button onClick={()=>mystore.dispatch({type:DECREASE,amount:2})}>-</button>
            </div>
        )
    }
}