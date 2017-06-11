import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import SearchForm from './Components/SearchForm';
import GifList from './Components/GifList';
import Load from './Components/Load'

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      gifs : [],
      loading : true,
      title : ''
    };
  }

  componentDidMount(){
    axios.get('https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC')
    .then(response => {
      this.setState({
        gifs: response.data.data,
        loading: false,
        title: 'Trending'
      });
    })
    .catch(error => {
      console.log('Error fetching and parsing data');
    });

  }

  performSearch = (query = 'cats') =>{
    axios.get(`https://api.giphy.com/v1/gifs/search?q=${query}&api_key=dc6zaTOxFJmzC  `)
    .then(response => {
      this.setState({
        gifs: response.data.data,
        loading: false,
        title : query
      });
    })
    .catch(error => {
      console.log('Error fetching and parsing data');
    });
  }

  render() {
    console.log(this.state.gifs);
    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1 className="main-title">GifDigest</h1>
            <SearchForm onSearch = {this.performSearch}/>
          </div>
        </div>
        <div className="main-content">
          <h1>{this.state.title}:</h1>
          {
            (this.state.loading)
            ?<p>Loading..</p>
            :<GifList data={this.state.gifs} />
          }
        </div>
      </div>
    );
  }
}
