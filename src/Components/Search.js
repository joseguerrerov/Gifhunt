//Dependencies
import React, { Component } from 'react'
import Radium from 'radium'
import {withRouter} from 'react-router-dom'


//Components
import Gifbox from './Gifbox'
import Emptysearch from './Emptysearch'


class Search extends Component {

  state = {
    result: true
  }

  gifAction =(index) => {
    this.props.gifAction(index)
  }
  componentDidMount(){
    window.scrollTo(0, 0)
    this.props.onLoad(this.props.match.params.name)
  }

  componentWillReceiveProps(nextProps){
    //Cehck if the next gif array is empty or not
    if(nextProps.gifs.length > 0){
      this.setState({
        result: true
      })
    }else{
      this.setState({
        result: false
      })
    }
    //Check if a new search must start
    if(this.props.match.params.name !== nextProps.match.params.name ){
      console.log('tenemos que hacer algo');
      this.props.onLoad(nextProps.match.params.name)
      console.log('true')
    }
  }

  getGifs = () =>{
    const results = this.props.gifs
    if(this.state.result){
      return(
        results.map((gif, index) =>
          <Gifbox
            action={this.gifAction}
            offset={index}
            fondoGif={gif.images.fixed_width.url}
            embed={gif.images.fixed_height.url}
            slug={gif.slug}
            show={this.props.isMobile ? null :gif.id}
            key={gif.id}
            user={gif.user}
            width="33.33%"
            height= '40vh'
            instant
            size="cover"
          />
        )
      )
    }else if (!this.state.result){
      console.log('hola');
      return(
        <Emptysearch />
      )
    }
  }

  render() {

    const setMarginTop = () =>(
      this.props.isMobile ? '67px' : '2em'
    )

    const styles = {
      searchResults: {
        minHeight: 'calc(100vh - 76px)',
        maxWidth: '100%',
        padding: '0 0.5em',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        marginTop: setMarginTop()
      },
    }

    return (
      <div style = {styles.searchResults}>
        {this.getGifs()}
      </div>
    );
  }

}
Search = Radium(Search)
Search = withRouter(Search)
export default Search;
