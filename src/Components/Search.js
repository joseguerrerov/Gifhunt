//Dependencies
import React, { Component } from 'react'
import Radium from 'radium'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

//Components
import Gifbox from './Gifbox'


class Search extends Component {

  state = {
    title: ''
  }

  componentDidMount(){
    this.props.onLoad(this.props.match.params.name)
  }

  shouldComponentUpdate(nextProps, nextState) {

    if(nextProps.title !== this.state.title){
      return true
    }else{
      console.log('si');
      return false
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.title !== this.props.title){
      return
    }else{
      this.props.onLoad(this.props.match.params.name)
    }
  }

  getGifs = () =>{

    console.log(this.props.match.params.name);
    return(
      this.props.gifs.map(gif=>
        <Gifbox
          fondoGif={gif.images.preview_gif.url}
          embed={gif.embed_url}
          key={gif.id}
          width="25%"
        />
      )
    )
  }

  render() {

    const styles = {
      searchResults: {
        minHeight: '100vh',
        maxWidth: '100%',
        padding: '0 0.5em',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
      },
    }

    return (
      <div style = {styles.searchResults}>
        {this.getGifs()}
      </div>
    );
  }

}

Search = withRouter(Search)
Search = Radium(Search)
export default Search;
