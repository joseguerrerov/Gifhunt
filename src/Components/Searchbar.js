//Dependencies
import React, { Component } from 'react'
import Radium from 'radium'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'


//Components

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
      searchBar : {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: '5px',
        padding: '0.5em',
        marginBottom: '0.5em',
        width: '100%',
        '@media (min-width: 600px)': {
          borderRadius: '10px',
          width: '40%',
        },
        mobile : {
          position: 'fixed',
          top: '0',
          zIndex: '1',
          height: '59px',
          borderRadius: '0',
          padding: '0 0.5em',
          boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px'
        }
      },
      input:{
        width: '90%',
        border: 'none',
        outline: 'none',
        padding: '1.2em 0.5em',
        transition: '400ms',
        backgroundColor: '#fff',
        borderBottom: '4px solid #e4e4e4',
        ':focus':{
          borderBottom: '4px solid #c1c1c1'
        },
        '@media (min-width: 600px)': {
          padding: '1.2em',
        },
        mobile:{
          borderBottom : '0',
          ':focus':{
            borderBottom: '0',
          }
        }
      },
      button:{
        width:'10%',
        border: 'none',
        outline: 'none',
        backgroundColor: '#fff',
      },
    }


    return (
      <form style={[styles.searchBar, this.props.mobileStyle ? styles.searchBar.mobile: null]} onSubmit={this.searchGif}>
        <input type="search"
          onChange={this.onSearchChange}
          style={[styles.input, this.props.mobileStyle ? styles.input.mobile : null]}
          name="search"
          ref = {(input) => this.query = input}
          placeholder="Search"
        />
        <button type="submit" style={styles.button}><i className="material-icons">search</i></button>
      </form>
    )
  }

}

Searchbar = Radium(Searchbar)
Searchbar = withRouter(Searchbar)
export default Searchbar;
