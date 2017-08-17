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
import Mobiletop from './Mobiletop'
import Gifview from './Gifview'
import Gifmodal from './Gifmodal'
import Desktopnav from './Desktopnav'
import Randomgif from './Randomgif'
import Lost from './Lost'
import Bottomnav from './Bottomnav'
import Searchbar from './Searchbar'
import GifTopNav from './GifTopNav'


//Assets

class Appview extends Component {

  state ={
    gifsHome: [],
    gifsSearch: [],
    paginationHome: 1,
    paginationSearch: 1,
    searchTabPoint: '/search/trending',
    title: '',
    barStatus : 'default',
    gifById: {},
    randomGif:{},
  }

  //function to search
  performSearch = (query = 'trending', limit = 12, pagination = 0, tab = 'home') =>{
    let apiEndPoint
    if(query === 'trending'){
      apiEndPoint =`https://api.giphy.com/v1/gifs/trending?api_key=1dbc2f313ec44971b8ee0815b6951dca&limit=${limit}`
    }else{
      apiEndPoint = `https://api.giphy.com/v1/gifs/search?q=${query}&limit=${limit}&lang=est&api_key=dc6zaTOxFJmzC`
    }
    axios.get(apiEndPoint)
    .then(response => {
      if(tab === 'home'){
        this.setState({
          gifsHome: response.data.data,
          paginationHome: response.data.pagination
        })
      }else if (tab === 'search'){
        this.setState({
          gifsSearch: response.data.data,
          paginationSearch: response.data.pagination,
          searchTabPoint: `/search/${query}`,
          query: query
        })
      }
      this.setState({
        title : query,
        barStatus : 'active'
      })
      /*
      this.setState({
      gifs: [...this.state.gifsHome, ...response.data.data],
      title : query,
      barStatus : 'active'
    })
    */
  })
  .catch(error => {
    console.log('Error fetching and parsing data, search');
  })
}

test=()=>{
  this.performSearch('trending', 12 , this.state.gifsHome.length)
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
    console.log('Error fetching and parsing data, byId')
  })
}

//Get random gif
getRandomGif = () => {
  axios.get('https://api.giphy.com/v1/gifs/random?api_key=1dbc2f313ec44971b8ee0815b6951dca')
  .then(response =>{
    this.setState({
      randomGif : response.data.data,
    })
  })
  .catch(error => {
    console.log('Error fetching and parsing data, random')
  })
}

//Function to set offest for paginitation
setOffset = (index) =>{
  this.setState({
    modalPos: index,
    gifByIdClick: this.state.gifsHome[index],
  })
}


//Function to store offset of routes
saveRouteOffset = (route, pageOffset) => {
  if(route.includes('/search/')){
    this.setState({
      searchOffset: pageOffset,
    })
  }else if(route === '/'){
    this.setState({
      homeOffset: pageOffset,
    })
  }
}

componentDidMount(){
  this.getRandomGif()
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

  const setTopNav = () =>{
    if(this.props.location.pathname === "/" || this.props.location.pathname === "/random-gif"){
      return(
        <Mobiletop/>
      )
    }else if(this.props.location.pathname.includes("/search/")){
      return(
        <Searchbar mobileStyle/>
      )
    }else if(this.props.location.pathname.includes("/gif/")){
      return(
        <GifTopNav query={this.state.query}/>
      )
    }
  }

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
        ? <Route render = {() => setTopNav()}/>
        : <Route render = {()=> <Desktopnav type={this.state.barStatus}/>}/>
      }
      <Switch location={isModal ? this.previousLocation : location}>

        {isMobile
          ?<Route exact path="/" render={() => ( <Search key="home" gifs={this.state.gifsHome} pagination={this.state.paginationHome} onLoad = {this.performSearch} viewGif={this.getGifById} gifAction={this.setOffset} isMobile={isMobile} pagOffset={this.state.homeOffset}/>)}/>
          :<Route exact path="/" component={Home}/>
        }

        <Route exact path="/search" render={() => ( <Redirect to="/search/trending"/>)}/>
        <Route exact path="/search/:name" render = {()=>
          <Search key="searchTab" gifs={isMobile ? this.state.gifsSearch : this.state.gifsHome}
            pagination={isMobile ? this.state.paginationSearch : this.state.paginationHome} onLoad={this.performSearch} viewGif={this.getGifById} gifAction={this.setOffset} isMobile={isMobile} pagOffset={this.state.searchOffset} isSearchTab saveOffset={this.saveRouteOffset}/>}
          />
          <Route exact path="/gif/:id" render ={ () => <Gifview gif={this.state.gifById} onLoad={this.getGifById} isMobile={isMobile}/>}/>
          <Route exact path="/random-gif" render={() => <Randomgif gif={this.state.randomGif} isMobile={isMobile}/>}/>
          <Route component = {Lost} />
        </Switch>




        {isModal
          ?<Route exact path="/gif/:id" render={() =>
            <Gifmodal index={this.state.modalPos} nav={this.setOffset} gifByClick={this.state.gifByIdClick}/>}
          />
          : null
        }
        {isMobile
          ? <Route render={()=> <Bottomnav randomCall={this.getRandomGif} saveOffset={this.saveRouteOffset} searchEndPoint={this.state.searchTabPoint}/>}/>
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
