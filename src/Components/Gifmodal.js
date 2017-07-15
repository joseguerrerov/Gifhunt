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
    this.modal.focus()
    this.setState({
      fondo: this.props.gifByClick.images.downsized_large.url,
      embed: this.props.gifByClick.images.fixed_height.url,
      user: this.props.gifByClick.user,
    })
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.gifByClick){
      this.setState({
        fondo: nextProps.gifByClick.images.downsized_large.url,
        embed: nextProps.gifByClick.images.fixed_height.url,
        user: nextProps.gifByClick.user,
        url: nextProps.gifByClick.id,
      })
    }
    if(nextProps.gifByClick.id !== this.props.gifByClick.id){
      let path = `/gif/${nextProps.gifByClick.id}`
      const location = {
        pathname: path,
        state: {modal: true}
      }
      this.props.history.replace(location)
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

  showMoreGifs = (delta) =>{
    this.props.nav(this.props.index + (delta))
  }

  modalNavForward = (e) =>{
    this.preventClose(e)
    this.showMoreGifs(1)
    console.log(this.props.index);
  }

  modalNavBackward = (e) =>{
    this.preventClose(e)
    this.showMoreGifs(-1)
  }

  modalKey = (e) =>{
    console.log(e.keyCode)
    //Move backwards
    if((e.keyCode === 37 || e.keyCode === 65) && this.props.index > 0){
      this.showMoreGifs(-1)
    //Move forward
    }else if(e.keyCode === 39 || e.keyCode === 68){
      this.showMoreGifs(1)
    }else if(e.keyCode === 27){
      this.props.history.goBack()
    }
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
        alignItems: 'center',
        '@media(min-width: 600px) and (max-width: 900px)':{
          width: '80%'
        }
      },
      navIcons:{
        color: '#fafafa',
        fontSize: '3em',
        cursor: 'pointer',
        userSelect: 'none'
      }
    }

    return (
      <div style = {styles.modal} onClick={this.close} onKeyDown={this.modalKey} tabIndex = "0" ref={(modal) => {this.modal = modal}}>
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

Gifmodal = Radium(Gifmodal)
Gifmodal = withRouter(Gifmodal)
export default Gifmodal;
