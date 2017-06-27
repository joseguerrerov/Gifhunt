//Dependencies
import React, { Component } from 'react'
import Radium from 'radium'

//Components

class Showgif extends Component {


  render() {

    const styles = {
      background: {
        boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 0px 1000px inset',
        flex: '1',
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundImage: `url(${this.props.fondoGif})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        
      },
    }

    return (
      <div style = {styles.background}>
      </div>
    )
  }

}

Showgif = Radium(Showgif)
export default Showgif;
