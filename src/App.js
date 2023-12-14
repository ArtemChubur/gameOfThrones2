import React from 'react';
import './App.css'
import {Routes, Route} from "react-router-dom";
import CharacterList from "./pages/characterList/characterList";
import DetailInfo from "./pages/detailInfo/detailInfo";

const App = () => {
    return (
        <div className='App'>
            <Routes>
                <Route exact path={'/'}  element={<CharacterList />}/>
                <Route exact path={'/:id'}  element={<DetailInfo />}/>
            </Routes>
        </div>
    );
};

export default App;