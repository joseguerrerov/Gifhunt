//Dependencies
import React, { Component } from 'react'
import Radium from 'radium'
import {withRouter, NavLink} from 'react-router-dom'


//Components

class Bottomnav extends Component {

  componentWillMount = () =>{
    this.setState({
      pointer: 'Trending'
    })
  }

  checkOffset = () => {
    this.props.saveOffset(this.props.location.pathname, window.scrollY)
  }

  callRandom = () => {
    this.props.randomCall()
    this.checkOffset()
  }


  render() {

    const isGifView = this.props.location.pathname.includes("/gif/")

    const styles = {
      bottomNav: {
        position: 'fixed',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: '0',
        backgroundColor: '#fff',
        boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
        border: '0 solid #000'
      },
      icons:{
        color: '#696969',
        marginBottom: '6px',
        active:{
          color: '#4285F4',
          fontWeight: '400',
        }
      },
      ref:{
        flex: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        padding: '6px 12px 10px 12px',
        textDecoration: 'none',
        color: '#696969',
      },
      title:{
        fontSize: '12px',
        active:{
          color: '#4285F4',
          fontWeight: '400',
        }
      }
    }

    return (
      <div style = {styles.bottomNav}>
        <NavLink exact to="/" activeClassName="selected-bottom-nav" style={styles.ref} onClick={this.checkOffset}>
          <i className="material-icons" style={styles.icons}>whatshot</i>
          <div style={styles.title}>{this.state.pointer}</div>
        </NavLink>
        <NavLink exact to={this.props.searchEndPoint} activeClassName="selected-bottom-nav" style={styles.ref} onClick={this.checkOffset}>
          <i className="material-icons" style={[styles.icons, isGifView ? styles.icons.active : null]}>search</i>
          <div style={[styles.title, isGifView ? styles.title.active : null]}>Search</div>
        </NavLink>
        <NavLink exact to="/random-gif" activeClassName="selected-bottom-nav" style = {styles.ref} onClick={this.callRandom}>
          <i className="material-icons" style={styles.icons}>shuffle</i>
          <div style={styles.title}>Random</div>
        </NavLink>
      </div>
    )
  }

}

Bottomnav = Radium(Bottomnav)
Bottomnav = withRouter(Bottomnav)
export default Bottomnav;
