//Dependencies
import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Radium from 'radium'

//Components
import FeatFooter from './FeatFooter'

//Assets
import lost from '../Img/lost.png'

class Lost extends Component {

  render() {

    const styles = {
      holder: {
        position: 'relative',
        width: '100%',
        height: 'calc(100vh - 84px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        '@media (min-width: 600px)': {
          background: '#4285F4',
        }
      },
      msgHolder:{
        background: '#fafafa',
        padding: '4em 3em',
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        '@media (min-width: 600px)': {
          boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
        }
      },
      msg:{
        color: '#3d3d3d',
        fontSize: '2em',
        margin: '0',
        fontWeight: '300',
        marginTop: '0.5em'
      },
      copy:{
        textAlign: 'center',
        color: '#3d3d3d',
        fontSize: '2em',
        margin: '0',
        '@media (min-width: 600px)': {
          fontSize: '3em',
        }
      },
      button:{
        marginTop: '1.5em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4285F4',
        outline: 'none',
        border: 'none',
        color: '#fff',
        fontWeight: '300',
        padding: '10px 16px',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'all 2s cubic-bezier(0.23, 1, 0.32, 1) 0ms',
        ':hover': {
          backgroundColor: '#0059c1'
        },
      }
    }

    return (
      <div style = {styles.holder}>
        <div style={styles.msgHolder}>
          <img src={lost}/>
          <h2 style={styles.msg}>Seems like</h2>
          <h1 style={styles.copy}>You got lost...</h1>
          <Link to="/" style={styles.button}>Go to a safe place <i className="material-icons">chevron_right</i></Link>
        </div>
      </div>

    );
  }

}

Lost = Radium(Lost)
export default Lost
