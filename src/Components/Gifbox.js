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
    if(typeof this.props.user !== 'undefined'){
      if(typeof this.props.user.display_name !== 'undefined' &&
         this.props.user.display_name !== '' &&
         this.props.display_name !== null){
           this.setState({
             avatar: this.props.user.avatar_url,
             profileUrl: this.props.user.profile_url,
             username: this.props.user.display_name,
           })
        }else{
          this.setState({
            avatar: this.props.user.avatar_url,
            profileUrl: this.props.user.profile_url,
            username: this.props.user.username,
          })
        }
      console.log('posible');
      console.log(this.props.user.display_name);
      console.log(this.props.user.avatar_url);
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
    console.log(`estas clickeando en ${this.props.id}`)
    this.props.history.push(`/gif/${this.props.id}`)
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
        <Socialfot embed={this.copyClipboard} show={this.showHdGif}/>
      </div>

    );
  }

}
Gifbox = Radium(Gifbox)
Gifbox = withRouter(Gifbox)
export default Gifbox;
