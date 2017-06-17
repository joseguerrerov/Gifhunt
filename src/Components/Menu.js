//Dependencies
import React, { Component } from 'react'
import Radium from 'radium'

//Components
import Mainnav from './Mainnav'
import Navlink from './Navlink'


class Menu extends Component {

  render() {

    const styles = {
      header: {
        maxWidth: '100%',
        padding: '2em 2.5em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
      },
      nav:{

      }
    }

    return (
      <div style = {styles.header}>
        <Navlink href="/" name="kuyuy"/>
        <Mainnav/>
      </div>
    );
  }

}

Menu = Radium(Menu)
export default Menu;
