import React from 'react';
import ReactDOM from 'react-dom';

function CreateElementsDemo(){
    return React.createElement('div', null, [
        React.createElement('h1', null, 'Ahalan React'),
        React.createElement('div', null, [
            React.createElement('p', null, 'Paragraph text...')
        ])
    ]);
}

function JSXDemo(){
    return <div>
                <h1>Ahalan React</h1>
                <div>
                    <p>
                        Paragraph text...
                    </p>
                </div>
            </div>;
}

function App(){   
    return <div>
            <CreateElementsDemo />
            <JSXDemo />
        </div>;
}

ReactDOM.render(<App />, document.getElementById('root'));