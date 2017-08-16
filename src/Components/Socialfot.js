//Dependencies
import React, { Component } from 'react'
import {Link} from 'react-router-dom'
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
        color: '#3d3d3d',
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
          {this.props.show &&
            <Link to={{pathname: this.props.href, state: { modal: true }}}>
            <i className="material-icons" style={styles.link} onClick={this.props.showAction}>visibility</i>
          </Link>
          }
          {this.props.embed &&
            <i className="material-icons" style={[styles.link, styles.embed]} onClick={this.props.embedAction}>link</i>
          }
        </div>
      </div>
    );
  }

}


Socialfot = Radium(Socialfot)
export default Socialfot;
