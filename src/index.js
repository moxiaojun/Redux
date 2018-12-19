import React from 'react'
import ReactDOM from 'react-dom'
import Counter from './componets/Counter'
import Todo from './componets/Todo'
ReactDOM.render(
    <div>
        <Counter/>
        <Todo/>
    </div>
    ,
    document.querySelector('#root')
);

