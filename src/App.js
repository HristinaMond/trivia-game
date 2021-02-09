import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Level from './components/level/Level';
import Question from './components/question/Question';
import './style/css/main.css';
function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <div className="trivia-time">
          <Switch>
            <Route path="/" exact component={Level} />
            <Route exact path="/play" component={Question} />
            <Route render={
              () => <h1> 404 Not found</h1>} />

          </Switch>
        </div>
      </div>
    </BrowserRouter>

  );
}

export default App;
