//Dependencies
import React, { Component } from 'react'
import Radium from 'radium'
import {withRouter} from 'react-router-dom'


//Components
import Gifbox from './Gifbox'

class Randomgif extends Component {

  state = {
    fondo: '',
  }

  componentDidMount(){
    this.setState({
      fondo: this.props.gif.fixed_height_downsampled_url,
      embed: this.props.gif.image_url
    })
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.gif){
      this.setState({
        fondo: nextProps.gif.fixed_height_downsampled_url,
        embed: nextProps.gif.image_url
      })
    }

  }


  render() {

    const setMarginTop = () => (
      this.props.isMobile ? '67px' : '2em'
    )

    const setPadding = () => (
      this.props.isMobile ? '0' : '0.5em'
    )

    const styles ={
      holder:{
        padding: setPadding(),
        display: 'flex',
        marginTop: setMarginTop(),
      }
    }
    return (
      <div style={styles.holder}>
      <Gifbox
        fondoGif={this.state.fondo}
        embed={this.state.embed}
        height="calc(50vh - 120px)"
        width="60%"
        size="contain"
      />
      </div>
    )
  }

}
Randomgif = Radium(Randomgif)
Randomgif = withRouter(Randomgif)
export default Randomgif;
