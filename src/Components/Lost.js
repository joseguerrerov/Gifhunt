//Dependencies
import React, { Component } from 'react'
import Radium from 'radium'


//Components

class Lost extends Component {

  render() {

    const styles = {
      holder: {
        position: 'relative',
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
      },
      embed: {
        color: '#fff',
        position: 'absolute',
        top: '0.5em',
        right: '0.5em',
        ':hover':{

        }
      }
    }

    return (
      <div style = {styles.holder}>
        <h1>404</h1>
      </div>

    );
  }

}

Lost = Radium(Lost)
export default Lost;
