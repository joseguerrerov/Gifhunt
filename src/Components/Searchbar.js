//Dependencies
import React, { Component } from 'react'
import Radium from 'radium'
import {withRouter, link} from 'react-router-dom'
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
          padding: '0 1em',
          background: '#fff',
          justifyContent: 'space-between',
          flexDirection: 'row',
          position: 'inherit',
          height: '76px',
          marginBottom: '0.5em',
          '@media (min-width: 600px)': {
            padding: '0 2em',
          },
        },
        title:{
          color: '#fafafa',
          fontSize: '4em',
          margin: '0',
          '@media (min-width: 600px)': {
            fontSize: '6em'
          },
        },
        titleActive:{
          color: '#3d3d3d',
          fontSize: '2em',
          margin: '0',
          '@media (max-width: 600px)': {
            display: 'none',
          },
          res:{
            fontSize: '1em',
            padding: '0.5em',
            backgroundColor: '#3d3d3d',
            borderRadius: '5px',
            color: '#fafafa',
            '@media (min-width: 600px)': {
              display: 'none'
            },
          },
        },
      },
      searchBar : {

        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: '10px',
        padding: '0.5em',
        marginBottom: '0.5em',
        '@media (min-width: 600px)': {
          borderRadius: '10px',
        },
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
      },
      powered:{
        width: '100px',
      },
      poweredLink:{
        alignSelf: 'flex-end'
      },
       brand:{
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '1em'
      },
      brandActive:{
       display: 'flex',
       flexDirection: 'column',

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
          {this.props.match.isExact
            ?(
              <div style={styles.brand}>
                <h1 style={styles.searchBarContainer.title}>Gifhunt</h1>
                <a href="https://giphy.com/" style={styles.poweredLink} target="_blank">
                  <img src={logo} style={styles.powered}/>
                </a>
              </div>
            ):(
              <div style={styles.brandActive}>
                <h1 style={styles.searchBarContainer.titleActive}>Gifhunt</h1>
                <h1 style={styles.searchBarContainer.titleActive.res}>Gh</h1>
              </div>
            )
          }

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

  Searchbar = Radium(Searchbar)
  Searchbar = withRouter(Searchbar)
  export default Searchbar;
