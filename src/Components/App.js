//Dependencies
import React, { Component } from 'react';
import {StyleRoot} from 'radium'
import {
  BrowserRouter,
  Route,
  Switch,
}from 'react-router-dom'
import normalize from 'normalize.css'
import axios from 'axios'

//Components
import Home from './Home'
import Search from './Search'
import Searchbar from './Searchbar'
import Lost from './Lost'

//Assets

class App extends Component {

  state ={
    gifs: [],
    title: '',
    barStatus : 'default'
  }

  performSearch = (query = 'cats') =>{
    axios.get(`https://api.giphy.com/v1/gifs/search?q=${query}&limit=20&lang=est&api_key=dc6zaTOxFJmzC`)
    .then(response => {
      this.setState({
        gifs: response.data.data,
        title : query,
        barStatus : 'active'
      })
    })
    .catch(error => {
      console.log('Error fetching and parsing data');
    })
  }




  render() {
    return (
      <StyleRoot>
        <BrowserRouter>
          <div>
            <Route render = {()=> <Searchbar type={this.state.barStatus}/>}/>
            <Switch>
              <Route exact path="/" component = {Home}/>
              <Route exact path="/search/:name" render = {()=><Search gifs={this.state.gifs}
                onLoad = {this.performSearch}/>} />
              <Route component = {Lost} />
            </Switch>
          </div>
        </BrowserRouter>
      </StyleRoot>
    );
  }
}

export default App;
