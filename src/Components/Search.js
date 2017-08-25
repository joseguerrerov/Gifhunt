//Dependencies
import React, { Component } from 'react'
import Radium from 'radium'
import {withRouter} from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroller'


//Components
import Gifbox from './Gifbox'
import Emptysearch from './Emptysearch'
import Loading from './Loading'
import FeatFooter from './FeatFooter'


class Search extends Component {

  state = {
    result: true,
    pagination: this.props.pagination.count,
    totalCount: this.props.pagination.total_count,
  }

  gifAction = (index) => {
    this.props.gifAction(index)
  }

  saveOffset = (route, pageOffset) =>{
    this.props.saveOffset(route, pageOffset)
    console.log('pageOffset');
  }

  getMoreGifs = (e) => {
    if(this.props.isMobile && this.props.isSearchTab){
      this.props.onLoad(this.props.match.params.name, 51, this.props.gifs.length, 'search', true)
    }else{
      this.props.onLoad(this.props.match.params.name, 12, this.props.gifs.length, 'home', true)
    }
  }

  componentDidMount(){
    console.log(this.props.pagOffset, 'mount');
    this.props.pagOffset > 0 ? window.scrollTo(0, this.props.pagOffset) : window.scrollTo(0,0)
    if(this.props.isMobile && this.props.isSearchTab && this.props.gifs.length <=51){
      this.props.onLoad(this.props.match.params.name, 51, 0, 'search')
    }else if(this.props.gifs.length <= 12){
      this.props.onLoad(this.props.match.params.name)
    }

  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps.pagOffset, 'will');
    typeof nextProps.pagOffset !== 'undefined' && nextProps.pagOffset !== this.props.pagOffset ? window.scrollTo(0, nextProps.pagOffset) : null
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
        console.log('2');
      }else{
        this.props.onLoad(nextProps.match.params.name)
      }
    }
  }



  getGifs = () =>{

    const results = this.props.gifs
    console.log(this.props.gifs);
    if(this.state.result && this.state.pagination > 1){
      return(
        results.map((gif, index) =>
        <Gifbox
          action={this.gifAction}
          offset={index}
          fondoGif={this.props.isMobile && this.props.isSearchTab ? gif.images.original_still.url : gif.images.fixed_width.url}
          embed={gif.images.fixed_height.url}
          slug={gif.slug}
          show={this.props.isMobile ? null :gif.id}
          key={gif.id + Math.floor(Math.random() * 5) + 1  }
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

  const setPaddingBottom = () =>(
    this.props.isMobile ? '70px' : '0'
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
      paddingBottom: setPaddingBottom(),
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
      margin: '1em 1em 4em 1em'
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
              ?<p style={styles.count}>We found {this.state.totalCount} results</p>
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
          <button style={styles.button} onClick={this.getMoreGifs} type="button">Load more <i className="material-icons">refresh</i></button>
        </div>
        :null
      }
      {this.props.isMobile? null: <FeatFooter/> }
    </div>
  );
}

}
Search = Radium(Search)
Search = withRouter(Search)
export default Search;
