//Dependencies
import React, { Component } from 'react'
import Radium from 'radium'


class Socialfot extends Component {

  render() {


    const styles = {
      infoHolder:{
        height: '53px',
        display: 'flex',
        padding: '0.3em 1em',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems:'center',
        backgroundColor: '#fff',
      },
      link: {
        color: '#171717',
        cursor: 'pointer',
        fontSize: '20px'
      },
      links:{
        display: 'flex',
      },
      embed:{
        margin: '0 0.4em',
      },
    }

    return (
      <div style = {styles.infoHolder}>
        <div style={styles.links}>
          <i className="material-icons" style={[styles.link, styles.embed]} onClick={this.props.embed}>link</i>
          <i className="material-icons" style={styles.link} onClick={this.props.show}>visibility</i>
        </div>
      </div>
    );
  }

}


Socialfot = Radium(Socialfot)
export default Socialfot;
