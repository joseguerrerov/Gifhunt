//Dependencies
import React, { Component } from 'react'
import Radium from 'radium'
import {withRouter, Link} from 'react-router-dom'


//Components

class Bottomnav extends Component {

  //Call random function
  callRandom = () => {
    this.props.randomCall();
  }


  render() {


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
        color: '#3d3d3d',
        marginBottom: '6px'
      },
      ref:{
        flex: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        padding: '6px 12px 10px 12px',
        textDecoration: 'none',
        color: '#3d3d3d',
      },
      title:{
        fontSize: '12px'
      }
    }

    return (
      <div style = {styles.bottomNav}>
        <Link to="/" style={styles.ref}>
          <i className="material-icons" style={styles.icons}>whatshot</i>
          <div style={styles.title}>Trending</div>
        </Link>
        <Link to="/search" style={styles.ref}>
          <i className="material-icons" style={styles.icons}>search</i>
          <div style={styles.title}>Search</div>
        </Link>
        <Link to="/random-gif" style = {styles.ref} onClick={this.callRandom}>
          <i className="material-icons" style={styles.icons}>shuffle</i>
          <div style={styles.title}>Random</div>
        </Link>
      </div>
    )
  }

}

Bottomnav = withRouter(Bottomnav)
Bottomnav = Radium(Bottomnav)
export default Bottomnav;
