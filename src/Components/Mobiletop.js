//Dependencies
import React, { Component } from 'react'
import Radium from 'radium'
import {withRouter} from 'react-router-dom'


//Components

class Mobiletop extends Component {

  //Call random function
  callRandom = () => {
    this.props.randomCall();
  }


  render() {


    const styles = {
      topHolder:{
        padding: '1em',
        position: 'fixed',
        zIndex: '999999',
        top:'0',
        left: '0',
        backgroundColor: '#fff',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px'
      },
      title:{
        margin: '0',
        color: '#3d3d3d',
      }
    }

    return (
      <div style = {styles.topHolder}>
        <h2 style={styles.title}>Gifhunt</h2>
      </div>
    )
  }

}

Mobiletop = withRouter(Mobiletop)
Mobiletop = Radium(Mobiletop)
export default Mobiletop;
