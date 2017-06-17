//Dependencies
import React, { Component } from 'react'
import Radium from 'radium'

//Components

class Showgif extends Component {

  randomHeight = () =>{
    return Math.random() * (40 - 20) + 20;
  }

  render() {

    const styles = {
      background: {
        boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 0px 1000px inset',
        flex: ` 1 ${this.randomHeight()}% `,
        display: 'flex',
        height: '33.33%',
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
