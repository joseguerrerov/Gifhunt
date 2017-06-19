//Dependencies
import React, { Component } from 'react'
import Radium from 'radium'


//Components

class Gifbox extends Component {

  state = {
    width: this.props.width,
    fondo : this.props.fondoGif
  }



  render() {

    const styles = {
      holder: {
        position: 'relative',
        width: `calc(100% - 1em)`,
        height: '30vh',
        margin: '0.5em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fafafa',
        backgroundImage: `url(${this.state.fondo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        '@media (min-width: 600px)': {
          width: `calc(${this.state.width} - 1em)`,
        }
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
        <a href={this.props.embed} style={styles.embed}><i className="material-icons">link</i></a>
      </div>

    );
  }

}

Gifbox = Radium(Gifbox)
export default Gifbox;
