//Dependencies
import React, { Component } from 'react'
import Radium from 'radium'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'

//Assets
import logo from '../Img/Powered.png'

class Searchbar extends Component {

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  state = {
    position: '',
    background: '',
    searchText: ''
  }

  onSearchChange = e => {
    this.setState({ searchText: e.target.value });
  }

  searchGif = e =>{
    e.preventDefault()
    let path
    if(this.state.searchText === ''){
      path = `/search/trending`
    }else{
      path = `/search/${this.state.searchText}`
    }
    this.props.history.push(path)
  }

  render() {
    const styles = {
      searchBarContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: '400ms',
        default:{
          background: 'none',
          position: 'absolute',
          height: '100%',
        },
        active:{
          background: '#fff',
          position: 'inherit',
          height: '76px',

        },
        title:{
          color: 'yellow',
          fontSize: '3em',
          marginBottom: '0',
        },
      },
      searchBar : {
        
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: '10px',
        padding: '0.5em',

      },
      input:{
        width: '90%',
        border: 'none',
        outline: 'none',
        padding: '1.2em',
        transition: '400ms',
        borderBottom: '4px solid #e4e4e4',
        ':focus':{
          borderBottom: '4px solid #c1c1c1'
        },
      },
      button:{
        width:'10%',
        border: 'none',
        outline: 'none',
        backgroundColor: '#fff',
      }
    }

    return (
      <form style={this.props.match.isExact
          ? (
            Object.assign({}, styles.searchBarContainer, styles.searchBarContainer.default)
          ):(
            Object.assign({}, styles.searchBarContainer, styles.searchBarContainer.active)
          )}
           onSubmit={this.searchGif}
        >
          <div>
            {/*}
            <h1 style={styles.searchBarContainer.title}>Show me those gifs !</h1>
            <img src={logo}/>{*/}
          </div>
          <div style={styles.searchBar} className='search-bar'>
            <input type="search"
              onChange={this.onSearchChange}
              style={styles.input}
              name="search"
              ref = {(input) => this.query = input}
              placeholder="Buscar"
            />
            <button type="submit" style={styles.button}><i className="material-icons">search</i></button>
          </div>
        </form>
      );
    }

  }

  Searchbar = withRouter(Searchbar)
  Searchbar = Radium(Searchbar)
  export default Searchbar;
