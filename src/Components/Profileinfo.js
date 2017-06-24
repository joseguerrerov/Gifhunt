//Dependencies
import React, { Component } from 'react'
import Radium from 'radium'


class Profileinfo extends Component {



  render() {


    const styles = {
      avatar:{
        height: '20px',
        width: '20px',
        borderRadius: '100%',
        backgroundColor: '#efefef',
        backgroundPosition: 'center',
        backgroundSize: 'contain'
      },
      avatarActive:{
        height: '20px',
        width: '20px',
        borderRadius: '100%',
        backgroundImage: `url(${this.props.avatar})`,
        backgroundPosition: 'center',
        backgroundSize: 'contain'
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
          width: 'auto',
          display: 'flex',
          alignItems:'center',
          justifyContent: 'center',
          cursor : 'pointer',
          username:{
            backgroundColor: '#efefef',
            color: '#171717',
            fontWeight:'300',
            fontSize: '1em',
            marginLeft: '0.4em',
            width: '300px',
            height: '20px'
          },
          usernameActive:{
            color: '#171717',
            fontWeight:'300',
            fontSize: '1em',
            marginLeft: '0.4em',
            height: '20px'
          }
        },

      }
    }

    return (
      <div style = {styles.infoHolder}>
        <a style ={styles.infoHolder.info} href={this.props.href} target='_blank'>
          {this.props.avatar.length > 0 &&
            <div style ={styles.avatarActive}></div>
          }
          {this.props.avatar.length === 0 &&
            <div style ={styles.avatar}></div>
          }
          {this.props.username.length > 0 &&
            <div style={styles.infoHolder.info.usernameActive}>{this.props.username}</div>
          }
          {this.props.username.length === 0 &&
            <div style={styles.infoHolder.info.username}></div>
          }
        </a>
      </div>
    );
  }

}


Profileinfo = Radium(Profileinfo)
export default Profileinfo;
