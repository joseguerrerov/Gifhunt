//Dependencies
import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import Radium from 'radium'

//Components

class Navlink extends Component {

  render() {

    return (
      <div className={this.props.css}>
        <NavLink exact to={this.props.href} activeStyle={this.props.active}>{this.props.name}</NavLink>
      </div>
    );
  }

}

Navlink = Radium(Navlink)
export default Navlink;
