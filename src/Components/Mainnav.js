//Dependencies
import React, { Component } from 'react'
import Radium from 'radium'

//Components
import Navlink from './Navlink'


class Mainnav extends Component {

  state = {
    links:[
      {
        name: 'link1',
        path: '/link1'
      },
      {
        name: 'link2',
        path: '/link2'
      },
      {
        name: 'link3',
        path: '/link3'
      },
      {
        name: 'link4',
        path: '/link4'
      }
    ]
  }

  render() {

    const styles = {
      mainNav: {
        display: 'flex',
        alignItems: 'center',
      },
      active:{
        color: 'green'
      },
      link:{
        ':hover': {
          backgroundColor: 'red'
        },
      }
    }

    const getLinks = this.state.links.map((link) => {
      return (
        <Navlink href={link.path} name={link.name} active={styles.active}/>
      )
    })

    return (
      <div style = {styles.mainNav}>
        {getLinks}
      </div>
    );
  }

}

Mainnav = Radium(Mainnav)
export default Mainnav;
