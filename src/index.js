import React from 'react';
import ReactDOM from 'react-dom';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


import Newsignature3 from './Newsignature3';
import Login from './Login';
import ResearcherDashboard from './ResearcherDashboard'

class App extends React.Component{
    // constructor(props){
    //     super(props);
    // }

    render(){
        return(
            <div>
                <ResearcherDashboard/>
                {/* <Login />  */}
                {/* <Newsignature3 /> */}
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

