//Dependencies
import React, { Component } from 'react'
import Radium from 'radium'
import {withRouter} from 'react-router-dom'


//Components
import Gifbox from './Gifbox'

class Bottomnav extends Component {


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
        padding: '6px 12px 10px 12px'
      },
      title:{
        fontSize: '12px'
      }
    }

    return (
      <div style = {styles.bottomNav}>
        <div style={styles.ref}>
          <i className="material-icons" style={styles.icons}>whatshot</i>
          <div style={styles.title}>Trending</div>
        </div>
        <div style={styles.ref}>
          <i className="material-icons" style={styles.icons}>search</i>
          <div style={styles.title}>Search</div>
        </div>
        <div style={styles.ref}>
          <i className="material-icons" style={styles.icons}>shuffle</i>
          <div style={styles.title}>Random</div>
        </div>
      </div>
    )
  }

}

Bottomnav = withRouter(Bottomnav)
Bottomnav = Radium(Bottomnav)
export default Bottomnav;
