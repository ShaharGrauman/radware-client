import React from 'react';
import ReactDOM from 'react-dom';

function getStyle() {
    return {
        color: 'red'
    };
}

function clickHandler(){
    alert('Button clicked');
}

function App(){
    const divStyle = {
        color: 'blue',
        fontSize: '50px'
    };
    
    return <div style={divStyle}>
             <h1>Ahalan Wasahalan!</h1>
             <h2 style={getStyle()}>Ma Nishma?</h2>
             <button onClick={clickHandler}>Counter</button>
           </div>;
}

ReactDOM.render(<App />, document.getElementById('root'));