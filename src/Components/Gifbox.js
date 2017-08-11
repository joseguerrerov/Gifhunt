//Dependencies
import React, { Component } from 'react'
import Radium from 'radium'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'

//Components
import Profileinfo from './Profileinfo'
import Socialfot from './Socialfot'

//Assets
import load from '../Img/ripple.gif'


class Gifbox extends Component {

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  state = {
    width: this.props.width,
    height: this.props.height,
    fondo : this.props.fondoGif,
    size: this.props.size,
    copyStatus: false,
    msgDisplay: 'none',
    username: '',
    avatar: '',
    profileUrl : '',
  }

  componentDidMount(){
    if(this.props.instant){
      this.checkForUserInfo(this.props.user)
      this.setState({
        embed: this.props.embed
      })
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      fondo: nextProps.fondoGif,
      embed: nextProps.embed,
      size: nextProps.size
    })
    this.checkForUserInfo(nextProps.user)
  }

  checkForUserInfo = (userInfo) =>{
    if(typeof userInfo !== 'undefined'){
      if(typeof userInfo.display_name !== 'undefined' &&
         userInfo.display_name !== '' &&
         this.props.display_name !== null){
           this.setState({
             avatar: userInfo.avatar_url,
             profileUrl: userInfo.profile_url,
             username: userInfo.display_name,
           })
        }else{
          this.setState({
            avatar: userInfo.avatar_url,
            profileUrl: userInfo.profile_url,
            username: userInfo.username,
          })
        }
    }else{
      this.setState({
        username: 'Giphy',
        avatar: 'https://media1.giphy.com/avatars/studiosoriginals/j3JBzK5twdv8.jpg',
        profileUrl : 'https://giphy.com/'
      })
    }
  }

  //Funcion para copiar el link al clipboard
  copyClipboard = (e) =>{
    e.preventDefault()
    //Copia
    this.textArea.select();
    document.execCommand('copy');
    //Gestionar estado
    this.setState({
      copyStatus: true,
      msgDisplay: 'block',
    })
    //Retornar estado
    setTimeout(function() {
      this.setState({
        copyStatus: false,
        msgDisplay: 'none',
      });
    }.bind(this), 1500);
  }

  showHdGif = () =>{
    this.props.action(this.props.offset)
    //this.props.history.push(`/gif/${this.props.show}`)
  }

  setMobileHeight = () =>(
    this.props.isMobile &&  this.props.isSearchTab ? '110px' : '50vh'
  )

  setMobileFlex = () =>(
    this.props.isMobile &&  this.props.isSearchTab ? '1 calc(33% - 3px)' : 'none'
  )

  setMobileMargin = () =>(
    this.props.isMobile &&  this.props.isSearchTab ? '1.5px' : '1em 0'
  )




  render() {

    const styles = {
      holder: {
        width: '100%',
        flex: this.setMobileFlex(),
        margin: this.setMobileMargin(),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
        borderRadius: '2px',
        '@media (min-width: 600px)': {
          margin: '1em 0.5em 0.5em 0.5em',
          width: `calc(${this.state.width} - 1em)`,
        },
      },
      gif:{
        display: 'flex',
        position: 'relative',
        backgroundColor: '#efefef',
        backgroundImage: `url(${this.state.fondo})`,
        backgroundSize: this.state.size,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: this.setMobileHeight(),
        width: '100%',
        '@media (min-width: 600px)': {
          height: this.state.height,
        },
      },
      msg:{
        display: this.state.msgDisplay,
        width: '100%',
        alignSelf: 'flex-end',
        padding: '0.5em',
        backgroundColor: '#64ffda',
        color: '#000',
        textAlign: 'center',
        transition: '400ms'
      },
      embedHolder:{
        position:'absolute',
        zIndex: '-100000',
        outline: 'none',
        border: 'none',
        color: 'rgba(255,255,255,0)',
        backgroundColor : 'rgba(255,255,255,0)',
        overflow: 'hidden'
      },

    }

    return (
      <div style = {[styles.holder, this.props.style]} onClick={this.props.onClick}>
        {this.props.isMobile && this.props.isSearchTab
          ?null
          :<Profileinfo username={this.state.username} avatar={this.state.avatar} href={this.state.profileUrl}/>
        }

        <div style={styles.gif}>
          <textarea
            readOnly='true'
            style={styles.embedHolder}
            ref={(textarea) => this.textArea = textarea}
            value={this.state.embed}
          />
          <div style={styles.msg}>
            Copy to clipboard
          </div>
        </div>
        {this.props.isMobile && this.props.isSearchTab
          ?null
          :<Socialfot embedAction={this.copyClipboard} showAction={this.showHdGif} embed={this.state.embed} show={this.props.show} href={`/gif/${this.props.show}`}/>
        }
      </div>

    );
  }

}

Gifbox = Radium(Gifbox)
Gifbox = withRouter(Gifbox)
export default Gifbox;
