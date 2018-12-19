import React from 'react'
import {createStore} from "../redux";
const ADD = 'ADD';
const DEL = 'DEL';
let reducer = (state = { list:[] },action)=>{
    if (action===undefined) return state;
    switch (action.type){
        case ADD:
            return {list:[...state.list,action.value]};
        case DEL:
            let list = state.list;
            list.splice(action.index,1);
            //我们的状态具备不变性，每次应该返回一个新的对象
            return {list:[...list]};
        default:
            return state
    }
};
let store = createStore(reducer);
export default class Todo extends React.Component{
    constructor(props){
        super(props);
        this.state = {list:store.getState().list};
    }
    handleKeyDown = (event)=>{
        if (event.keyCode === 13 && event.target.value.length>0) {
            store.dispatch({type:ADD,value:event.target.value});
            event.target.value = '';
        }
    };
    componentWillMount(){
        this.unsubscribe = store.subscribe(()=>{
            this.setState({
                list:store.getState().list
            })
        });
    }
    componentWillUnMount(){
        this.unsubscribe();
    }
    render(){
        return (
            <div>
                <input type="text" onKeyDown={this.handleKeyDown}/>
                <ul>
                    {
                        this.state.list.map((todo,idx)=>(<li key={idx}>{todo}<button onClick={()=>store.dispatch({type:DEL,index:idx})}>-</button></li>))
                    }
                </ul>
            </div>
        )
    }
}