//Dependencies
import React, { Component } from 'react'
import Radium from 'radium'
import {withRouter} from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroller'


//Components
import Gifbox from './Gifbox'
import Emptysearch from './Emptysearch'
import Loading from './Loading'


class Search extends Component {

  state = {
    result: true,
    pagination: this.props.pagination.count,
    totalCount: this.props.pagination.total_count,
    scrollY: this.props.pagOffset,
  }

  gifAction = (index) => {
    this.props.gifAction(index)
  }

  saveOffset = (route, pageOffset) =>{
    this.props.saveOffset(route, pageOffset)
    this.setState({
      scrollY: pageOffset
    })
  }

  getMoreGifs = () =>{
    this.props.saveOffset(this.props.location.pathname, window.scrollY)
    if(this.props.isMobile && this.props.isSearchTab){
      this.props.onLoad(this.props.match.params.name, 51, this.props.gifs.length, 'search', true)
    }else{
      this.props.onLoad(this.props.match.params.name, 12, this.props.gifs.length, 'home', true)
    }
  }

  componentDidMount(){
    console.log('mounting');
    this.state.scrollY > 0 ? window.scrollTo(0, this.state.scrollY) : window.scrollTo(0,0)
    if(this.props.isMobile && this.props.isSearchTab){
      this.props.onLoad(this.props.match.params.name, 51, 0, 'search')
    }else{
      this.props.onLoad(this.props.match.params.name)
    }

  }

  componentWillReceiveProps(nextProps){

    this.state.scrollY > 0 ? window.scrollTo(0, this.state.scrollY) : window.scrollTo(0, nextProps.pagOffset)
    if(nextProps.pagination.count !== this.props.pagination.count){
      this.setState({
        pagination: nextProps.pagination.count
      })
    }
    if(nextProps.pagination.total_count !== this.props.pagination.total_count){
      this.setState({
        totalCount: nextProps.pagination.total_count
      })
    }
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
      if(this.props.isMobile && nextProps.isSearchTab){
        this.props.onLoad(nextProps.match.params.name, 51, 0, 'search')
      }else{
        this.props.onLoad(nextProps.match.params.name)
      }
    }
  }



  getGifs = () =>{

    const results = this.props.gifs
    if(this.state.result && this.state.pagination > 1){
      return(
        results.map((gif, index) =>
        <Gifbox
          action={this.gifAction}
          offset={index}
          fondoGif={this.props.isMobile && this.props.isSearchTab ? gif.images.preview_gif.url : gif.images.fixed_width.url}
          embed={gif.images.fixed_height.url}
          slug={gif.slug}
          show={this.props.isMobile ? null :gif.id}
          key={gif.id}
          loc={gif.id}
          user={gif.user}
          width="33.33%"
          height= '40vh'
          instant
          size="cover"
          isMobile={this.props.isMobile}
          isSearchTab={this.props.isSearchTab}
          saveOffset={this.saveOffset}
        />
      )
    )

  }else if (typeof this.state.pagination === 'undefined' || this.state.pagination === 1){
    return(
      <Loading/>
    )
  }else if(typeof this.state.pagination !== 'undefined' && this.state.pagination === 0){
    return(
      <Emptysearch />
    )
  }
}

render() {

  const setMarginTop = () =>(
    this.props.isMobile ? '67px' : 'calc(2em - 1px)'
  )

  const setPadding = () => (
    this.props.isMobile ? '0 0 1em 0' : '0.5em'
  )

  const setQueryMargin = () =>(
    this.state.totalCount > 0 ? '5px' : '1em'
  )

  const styles = {
    searchResults: {
      minHeight: 'calc(100vh - 76px)',
      width: '100%',
      padding: setPadding(),
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      position:'relative',
    },
    holder:{
      marginTop: setMarginTop(),
      paddingBottom: '70px',
      paddingTop: '1px'
    },
    query:{
      textAlign: 'center',
      color: '#696969',
      fontWeight: '300',
      marginTop: '1em',
      marginBottom: setQueryMargin()
    },
    count:{
      marginTop: '0',
      textAlign:' center',
      color: '#696969',
      fontWeight: '300',
      fontSize: '0.8em',
      marginBottom: '1.5em'
    },
    buttonHolder:{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '1em'
    },
    button:{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#4285F4',
      outline: 'none',
      border: 'none',
      color: '#fff',
      fontWeight: '300',
      padding: '10px 16px',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'all 2s cubic-bezier(0.23, 1, 0.32, 1) 0ms',
      ':hover': {
        backgroundColor: '#0059c1'
      },
    }
  }

  return (
    <div style={styles.holder}>
      {this.props.isMobile && this.props.isSearchTab && this.state.result && this.state.pagination > 1
        ?(
          <div>
            <h3 style={styles.query}>{this.props.match.params.name}</h3>
            {this.state.totalCount > 0
              ?<p style={styles.count}>Encontramos {this.state.totalCount} resultados</p>
              :null
            }
          </div>
        )
        :null
      }
      <div style = {styles.searchResults}>
        {this.getGifs()}
      </div>
      {
        this.state.result && this.state.pagination > 1
        ?<div style={styles.buttonHolder}>
          <button style={styles.button} onClick={this.getMoreGifs}>Load more</button>
        </div>
        :null
      }
    </div>
  );
}

}
Search = Radium(Search)
Search = withRouter(Search)
export default Search;
