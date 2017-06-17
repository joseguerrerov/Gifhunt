//Dependencies
import React, { Component } from 'react'
import Radium from 'radium'


//Components

class Share extends Component {

  render() {

    const styles = {
      holder: {
        width: `calc(${this.state.width} - 1em)`,
        height: '30vh',
        margin: '0.5em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fafafa',
        backgroundImage: `url(${this.props.fondoGif})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      },
    }

    return (
      <div style = {styles.holder}>
        <i className="material-icons">link</i>
      </div>

    );
  }

}

Share = Radium(Share)
export default Share;
