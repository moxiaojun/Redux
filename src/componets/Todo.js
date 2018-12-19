import React from 'react'
import {store} from '../store/store'
import {ADD_TODO,DEL_TODO} from "../actions";

export default class Todo extends React.Component{
    constructor(props){
        super(props);
        this.state = {list:store.getState().todo.list};
    }
    handleKeyDown = (event)=>{
        if (event.keyCode === 13 && event.target.value.length>0) {
            console.log(store.dispatch);
            store.dispatch({type:ADD_TODO,value:event.target.value});
            event.target.value = '';
        }
    };
    componentWillMount(){
        this.unsubscribe = store.subscribe(()=>{
            this.setState({
                list:store.getState().todo.list
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
                        this.state.list.map((todo,idx)=>(<li key={idx}>{todo}<button onClick={()=>store.dispatch({type:DEL_TODO,index:idx})}>-</button></li>))
                    }
                </ul>
            </div>
        )
    }
}