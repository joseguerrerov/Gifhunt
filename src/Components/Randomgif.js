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
      fondo: this.props.gif.fixed_width_downsampled_url,
    })
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.gif){
      this.setState({
        fondo: nextProps.gif.fixed_width_downsampled_url,
      })
    }

  }


  render() {
    const styles ={
      holder:{
        padding: '0 0.5em',
        marginTop: '1em'
      }
    }
    return (
      <div style={styles.holder}>
      <Gifbox
        fondoGif={this.state.fondo}
        embed={this.state.embed}
        height="60vh"
        width="60%"
        size="contain"
      />
      </div>
    )
  }

}

Randomgif = withRouter(Randomgif)
Randomgif = Radium(Randomgif)
export default Randomgif;
