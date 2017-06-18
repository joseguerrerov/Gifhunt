//Dependencies
import React, { Component } from 'react'
import Radium from 'radium'
import {withRouter} from 'react-router-dom'


//Components
import Gifbox from './Gifbox'
import Emptysearch from './Emptysearch'


class Search extends Component {


  componentDidMount(){
    this.props.onLoad(this.props.match.params.name)
  }

  componentWillReceiveProps(nextProps){

    if(this.props.match.params.name !== nextProps.match.params.name ){
      console.log('tenemos que hacer algo');
      this.props.onLoad(nextProps.match.params.name)
    }else{
      return
    }
  }


  getGifs = () =>{
    const results = this.props.gifs
    if(results.length > 0){
      return(
        results.map(gif=>
          <Gifbox
            fondoGif={gif.images.preview_gif.url}
            embed={gif.embed_url}
            key={gif.id}
            width="25%"
          />
        )
      )
    }else if (results === 0){
      console.log('hola');
      return(
        <Emptysearch />
      )
    }
  }

  render() {


    const styles = {
      searchResults: {
        minHeight: 'calc(100vh - 76px)',
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
