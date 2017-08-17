//Dependencies
import React, { Component } from 'react'
import Radium from 'radium'
import {withRouter} from 'react-router-dom'


//Components

class GifTopNav extends Component {

  goBack = (e) =>{
    this.props.history.goBack()
  }

  render() {

    const styles = {
      topHolder:{
        padding: '1em',
        position: 'fixed',
        zIndex: '999999',
        top:'0',
        left: '0',
        backgroundColor: '#fff',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px'
      },
      title:{
        margin: '0',
        color: '#3d3d3d',
      },
      icon:{
        position: 'absolute',
        left: '13px',
        fontSize:'34px'
      }
    }

    return (
      <div style = {styles.topHolder}>
        <i className="material-icons" style={styles.icon} onClick={this.goBack}>chevron_left</i>
        <h2 style={styles.title}>{this.props.query ? this.props.query : 'Gifhunt' }</h2>
      </div>
    )
  }

}

GifTopNav = withRouter(GifTopNav)
GifTopNav = Radium(GifTopNav)
export default GifTopNav;
