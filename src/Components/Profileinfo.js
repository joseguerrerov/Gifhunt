//Dependencies
import React, { Component } from 'react'
import Radium from 'radium'


class Profileinfo extends Component {

  render() {


    const styles = {
      avatar:{
        height: '20px',
        width: '20px',
        borderRadius: '100%'
      },
      infoHolder:{
        height: '63px',
        display: 'flex',
        padding: '0.3em 1em',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems:'center',
        backgroundColor: '#fff',
        info:{
          display: 'flex',
          alignItems:'center',
          justifyContent: 'center',
          cursor : 'pointer',
          username:{
            color: '#171717',
            fontWeight:'300',
            fontSize: '1em',
            marginLeft: '0.4em',
          }
        },

      }
    }

    return (
      <div style = {styles.infoHolder}>
        <a style ={styles.infoHolder.info} href={this.props.href} target='_blank'>
          <img src={this.props.avatar} style ={styles.avatar}/>
          <h2 style={styles.infoHolder.info.username}>{this.props.username}</h2>
        </a>
      </div>
    );
  }

}


Profileinfo = Radium(Profileinfo)
export default Profileinfo;
