import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'; //React-router import

import './App.css';

import Main from "./container/Main";
import Viewer from './container/Viewer';
import About from './container/About';
import Memo from './container/Memo';
import Push_up from './container/Push_up';
import Sit_up from './container/Sit_up';
import Squat from './container/Squat';
import Tae from './container/Tae';
import Tae1 from './container/Tae1';
import Tae2 from './container/Tae2';
import Tae3 from './container/Tae3';
import Tae4 from './container/Tae4';

import Yoga from './container/Yoga';
import Yoga1 from './container/Yoga1';
import Yoga2 from './container/Yoga2';
import Yoga3 from './container/Yoga3';
import Yoga4 from './container/Yoga4';

import Dance from './container/Dance';
import Dance1 from './container/Dance1';
import Dance2 from './container/Dance2';
import Dance3 from './container/Dance3';
import Dance4 from './container/Dance4';

function App() {
  
  
  return (
    
    <div className="App">
        
        <Router>
        <div> 
          <Route exact path="/" component={Main} /> 
          <Route path="/viewer/" component={Viewer} />
          <Route path="/about/" component={About}/> 
          <Route path="/memo/" component={Memo}/>
          <Route path="/squat/" component={Squat}/>
          <Route path="/push_up" component={Push_up} />
          <Route path="/sit_up" component={Sit_up} />
          <Route path="/tae" component={Tae}/>
          <Route path="/tae1" component={Tae1}/>
          <Route path="/tae2" component={Tae2}/>
          <Route path="/tae3" component={Tae3}/>
          <Route path="/tae4" component={Tae4}/>

          <Route path="/yoga" component={Yoga}/>
          <Route path="/yoga1" component={Yoga1}/>
          <Route path="/yoga2" component={Yoga2}/>
          <Route path="/yoga3" component={Yoga3}/>
          <Route path="/yoga4" component={Yoga4}/>
          
          <Route path="/dance" component={Dance}/>
          <Route path="/dance1" component={Dance1}/>
          <Route path="/dance2" component={Dance2}/>
          <Route path="/dance3" component={Dance3}/>
          <Route path="/dance4" component={Dance4}/>
        </div> 
        </Router> 
      
   
      
    </div>
  );
}


export default App;