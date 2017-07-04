//Dependencies
import React, { Component } from 'react'
import Radium from 'radium'
import {withRouter, Link} from 'react-router-dom'
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
          padding: '1em',
        },
        active:{
          background: '#fff',
          alignItems: '',
          justifyContent: 'space-between',
          flexDirection: 'column',
          height: 'auto',
          position: 'inherit',
          marginBottom: '0.5em',
          boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
          '@media (min-width: 600px)': {
            alignItems: 'center',
            height: '76px',
            flexDirection: 'row',
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
            width: '100%',
            color: '#fafafa',
            backgroundColor: '#3d3d3d',
            padding: '0.5em 0 0.5em 0.5em',
            fontSize: '1.7em',
          },
        },
      },
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
      },
      input:{
        width: '90%',
        border: 'none',
        outline: 'none',
        padding: '1.2em 0.5em',
        transition: '400ms',
        borderBottom: '4px solid #e4e4e4',
        ':focus':{
          borderBottom: '4px solid #c1c1c1'
        },
        '@media (min-width: 600px)': {
          padding: '1.2em',
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
        '@media (min-width: 600px)': {
          borderRadius: '10px',
        },
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
          {this.props.match.isExact?(
            <div style={styles.brand}>
              <h1 style={styles.searchBarContainer.title}>Gifhunt</h1>
              <a href="https://giphy.com/" style={styles.poweredLink} target="_blank">
              <img src={logo} style={styles.powered}/>
            </a>
          </div>
        ):(
          <div style={styles.brandActive}>
            <Link to="/"><h1 style={styles.searchBarContainer.titleActive}>Gifhunt</h1></Link>
          </div>
        )}

        <div style={styles.searchBar}>
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
