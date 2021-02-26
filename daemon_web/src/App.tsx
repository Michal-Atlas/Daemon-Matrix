import './App.scss';
import TagDisplay from "./Components/TagDisplay";
import {TagSideBar} from "./Components/TagSideBar";
import React from "react";
import {Route} from "react-router";
import View from "./View";
import Processor from "./Processor";

function App() {
    return (
        <div className="App">
            <Route exact path='/' component={View} />
            <Route path='/process' component={Processor} />
        </div>
    );
}

export default App;
