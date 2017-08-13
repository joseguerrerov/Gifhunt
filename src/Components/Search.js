//Dependencies
import React, { Component } from 'react'
import Radium from 'radium'
import {withRouter} from 'react-router-dom'


//Components
import Gifbox from './Gifbox'
import Emptysearch from './Emptysearch'
import Loading from './Loading'


class Search extends Component {

  state = {
    result: true,
    pagination: this.props.pagination.count,
    totalCount: this.props.pagination.total_count
  }

  gifAction =(index) => {
    this.props.gifAction(index)
  }
  componentDidMount(){
    window.scrollTo(0,0)
    if(this.props.isMobile && this.props.isSearchTab){
      this.props.onLoad(this.props.match.params.name, 27, 0, 'search')
    }else{
      this.props.onLoad(this.props.match.params.name)
    }

  }

  componentWillReceiveProps(nextProps){

    window.scrollTo(0, nextProps.pagOffset)

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
    if(this.state.result){
      return(
        results.map((gif, index) =>
          <Gifbox
            action={this.gifAction}
            offset={index}
            fondoGif={this.props.isMobile && this.props.isSearchTab?gif.images.preview_gif.url:gif.images.fixed_width.url}
            embed={gif.images.fixed_height.url}
            slug={gif.slug}
            show={this.props.isMobile ? null :gif.id}
            key={gif.id}
            user={gif.user}
            width="33.33%"
            height= '40vh'
            instant
            size="cover"
            isMobile={this.props.isMobile}
            isSearchTab={this.props.isSearchTab}
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
      this.props.isMobile ? '0' : '0.5em'
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
      }
    }

    return (
      <div style={styles.holder}>
        {this.props.isMobile && this.props.isSearchTab
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
      </div>
    );
  }

}
Search = Radium(Search)
Search = withRouter(Search)
export default Search;
