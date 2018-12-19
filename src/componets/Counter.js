import React from 'react'
import {store} from "../store/store";
import {INCREASE,DECREASE} from "../actions";


export default class Counter extends React.Component{
    constructor(){
        super();
        this.state = {number: store.getState().counter.number};
    }
    componentWillMount(){
        this.unsubscribe = store.subscribe(()=>{
            this.setState({
                number:store.getState().counter.number
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