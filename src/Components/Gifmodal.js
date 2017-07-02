//Dependencies
import React, { Component } from 'react'
import Radium from 'radium'
import {withRouter} from 'react-router-dom'


//Components
import Gifbox from './Gifbox'

class Gifmodal extends Component {

  state = {
    result: false,
  }

  componentDidMount(){
    document.getElementsByTagName('body')[0].style.overflow = 'hidden'
    this.setState({
      fondo: this.props.gifByClick.images.downsized_large.url,
      embed: this.props.gifByClick.images.fixed_height.url,
      user: this.props.gifByClick.user,
    })

    console.log(this.props.gif);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.gif){
      console.log(nextProps.gif.images.fixed_height.url);
      this.setState({
        result: true,
        gif : nextProps.gif,
        fondo: nextProps.gif.images.downsized_large.url,
        embed: nextProps.gif.images.fixed_height.url,
        user: nextProps.gif.user,
      })
    }
  }

  componentWillUnmount(){
    document.getElementsByTagName('body')[0].style.overflow = 'visible'
  }

  close = (e) =>{
    //e.stopPropagation()
    this.props.history.goBack()
  }

  closeButton = (e) =>{
    e.stopPropagation()
    this.props.history.goBack()
  }

  preventClose = (e) =>{
    e.stopPropagation()
  }

  modalNavForward = (e) =>{
    this.preventClose(e)
    this.showMoreGifs(1)
  }

  modalNavBackward = (e) =>{
    this.preventClose(e)
    this.showMoreGifs(-1)
  }

  showMoreGifs = (delta) =>{
    console.log(delta)
  }

render() {


  const styles = {
    modal: {
      top: window.scrollY,
      position: 'absolute',
      zIndex: '2',
      height: '100vh',
      width: '100%',
      padding: '0 0.5em',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,.75)',
    },
    close:{
      fontWeight: '600',
      position: 'absolute',
      top: '2em',
      right: '2em',
      color: '#fafafa',
      cursor: 'pointer'
    },
    gif:{
      position: 'absolute',
      zIndex: '3',
      width: '60%',
      display: 'flex',
      alignItems: 'center'
    },
    navIcons:{
      color: '#fafafa',
      fontSize: '3em',
      cursor: 'pointer',
      userSelect: 'none'
    }
  }

  return (
    <div style = {styles.modal} onClick={this.close}>
      <i className="material-icons" style={styles.close} onClick={this.closeButton}>close</i>
      <div style={styles.gif}>
        {this.props.index > 0 &&
          <i className="material-icons" style={styles.navIcons} onClick={this.modalNavBackward}>chevron_left</i>
        }
        <Gifbox
          fondoGif={this.state.fondo}
          embed={this.state.embed}
          user={this.state.user}
          height="70vh"
          width="100%"
          size="contain"
          onClick={this.preventClose}
        />
        <i className="material-icons" style={styles.navIcons} onClick={this.modalNavForward}>chevron_right</i>
      </div>
    </div>
  );
}

}

Gifmodal = withRouter(Gifmodal)
Gifmodal = Radium(Gifmodal)
export default Gifmodal;
