//Dependencies
import React, { Component } from 'react'
import Radium from 'radium'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'

//Components
import Profileinfo from './Profileinfo'
import Socialfot from './Socialfot'


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
    copyStatus: false,
    msgDisplay: 'none',
    username: 'Giphy',
    avatar: 'https://media1.giphy.com/avatars/studiosoriginals/j3JBzK5twdv8.jpg',
    profileUrl : 'https://giphy.com/'
  }

  componentWillMount(){
    this.checkForUserInfo(this.props.user)
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps.user);
    this.setState({
      fondo: nextProps.fondoGif,
      embed: nextProps.embed
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
      console.log('posible');
      console.log(userInfo.display_name);
      console.log(userInfo.avatar_url);
    }else{
      console.log('imposible');
    }
  }

  //Funcion para copiar el link al clipboard
  copyClipboard = (e) =>{
    e.preventDefault()
    //Copiar
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
    console.log(`estas clickeando en ${this.props.show}`)
    this.props.history.push(`/gif/${this.props.show}`)
  }



  render() {

    const styles = {
      holder: {
        width: `calc(100% - 1em)`,
        margin: '0.5em',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
        borderRadius: '2px',
        '@media (min-width: 600px)': {
          width: `calc(${this.state.width} - 1em)`,
        },
      },
      gif:{
        display: 'flex',
        position: 'relative',
        backgroundColor: '#fafafa',
        backgroundImage: `url(${this.state.fondo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: this.state.height,
        width: '100%'

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
      },

    }



    return (
      <div style = {styles.holder}>
        <Profileinfo username={this.state.username} avatar={this.state.avatar} href={this.state.profileUrl}/>
        <div style={styles.gif}>
          <textarea
            readOnly='true'
            style={styles.embedHolder}
            ref={(textarea) => this.textArea = textarea}
            defaultValue={this.props.embed}
          />
          <div style={styles.msg}>
            copied to clipboard
          </div>
        </div>
        <Socialfot embedAction={this.copyClipboard} showAction={this.showHdGif} embed={this.props.embed} show={this.props.show}/>
      </div>

    );
  }

}

Gifbox = Radium(Gifbox)
Gifbox = withRouter(Gifbox)
export default Gifbox;
