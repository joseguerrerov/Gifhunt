//Dependencies
import React, { Component } from 'react';
import {StyleRoot} from 'radium'
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
}from 'react-router-dom'
import normalize from 'normalize.css'
import axios from 'axios'

//Components
import Home from './Home'
import Search from './Search'
import Gifview from './Gifview'
import Gifmodal from './Gifmodal'
import Searchbar from './Searchbar'
import Lost from './Lost'
import Bottomnav from './Bottomnav'


//Assets

class Appview extends Component {

  state ={
    gifs: [],
    title: '',
    barStatus : 'default',
    gifById: {},
  }

  //function to search
  performSearch = (query = 'cats', limit = 21) =>{
    let apiEndPoint =`https://api.giphy.com/v1/gifs/trending?api_key=1dbc2f313ec44971b8ee0815b6951dca&limit=${limit}`
    if(query === 'trending'){

    }else{
      apiEndPoint = `https://api.giphy.com/v1/gifs/search?q=${query}&limit=${limit}&lang=est&api_key=dc6zaTOxFJmzC`
    }
    axios.get(apiEndPoint)
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

  //Function to search by gifid
  getGifById = (id = '26gR0t9sNVrbVEhPO') => {
    axios.get(`https://api.giphy.com/v1/gifs/${id}?api_key=1dbc2f313ec44971b8ee0815b6951dca`)
    .then(response =>{
      this.setState({
        gifById : response.data.data,
      })
    })
    .catch(error => {
      console.log('Error fetching and parsing data')
    })
  }

  //Function to set offest for paginitation
  setOffset = (index) =>{
    this.setState({
      modalPos: index,
      gifByIdClick: this.state.gifs[index],
    })
  }

  previousLocation = this.props.location

  componentWillUpdate(nextProps) {
    const { location } = this.props
    // set previousLocation if props.location is not modal
    if (nextProps.history.action !== 'POP' && (!location.state || !location.state.modal)){
      this.previousLocation = this.props.location
    }
  }

  render() {
    console.log(window.innerWidth)

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    const { location } = this.props
    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location // not initial render
    )



    return (

      <div>
        {isMobile
          ? null
          : <Route render = {()=> <Searchbar type={this.state.barStatus}/>}/>
        }
        <Switch location={isModal ? this.previousLocation : location}>
          <Route exact path="/" component = {Home}/>
          <Route exact path="/search" render={() => ( <Redirect to="/search/trending"/>)}/>
          <Route exact path="/search/:name" render = {()=>
            <Search gifs={this.state.gifs} onLoad = {this.performSearch} viewGif={this.getGifById} gifAction={this.setOffset}/>}
          />
          <Route exact path="/gif/:id" render ={ () => <Gifview gif={this.state.gifById} onLoad={this.getGifById}/>}/>
          <Route component = {Lost} />
        </Switch>
        {isModal
          ?<Route exact path="/gif/:id" render={() =>
            <Gifmodal index={this.state.modalPos} nav={this.setOffset} gifByClick={this.state.gifByIdClick}/>}
          />
          : null
        }
        {isMobile
          ? <Route component={Bottomnav}/>
          : null
        }

      </div>

    )
  }
}


const  App = () => (
  <StyleRoot>
    <BrowserRouter>
      <Route component = {Appview}/>
    </BrowserRouter>
  </StyleRoot>
)


export default App;
