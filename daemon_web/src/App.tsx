import './App.scss';
import TagDisplay from "./Components/TagDisplay";
import {TagSideBar} from "./Components/TagSideBar";
import React from "react";
import {Route} from "react-router";
import View from "./Pages/View";
import TagList from "./Pages/TagManagement";
import Auth from "./Components/Auth";
import AddImage from "./Pages/AddImage";
import PixView from "./Pages/PixView";

function App() {
    return (
        <div className="App">
            <Route exact path='/' component={View} />
            <Route exact path='/tags/:tagId' component={View} />
            <Route exact path='/tags' component={TagList} />
            <Route path='/add' component={AddImage} />
            <Route path='/pix/:picId' component={PixView} />
        </div>
    );
}

export default App;
