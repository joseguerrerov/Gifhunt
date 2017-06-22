//Dependencies
import React, { Component } from 'react'
import Radium from 'radium'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'


//Components

class Gifbox extends Component {

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  state = {
    width: this.props.width,
    fondo : this.props.fondoGif,
    copyStatus: false,
    msgDisplay: 'none',
    username: 'Giphy',
    avatar: 'https://media1.giphy.com/avatars/studiosoriginals/j3JBzK5twdv8.jpg',
  }

  componentWillMount(){
    if(typeof this.props.user !== 'undefined'){
      this.setState({
        username: this.props.user.display_name,
        avatar: this.props.user.avatar_url,
      })
      console.log('posible');
      console.log(this.props.user.username);
      console.log(this.props.user.avatar_url);
    }else{
      console.log('imposible');
    }
  }

  //Funcion para copiar el link al clipboard
  copyClipboard = () =>{
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
        height: '30vh',
        width: '100%'

      },
      link: {
        color: '#171717',
        cursor: 'pointer',
        fontSize: '20px'
      },
      embed:{
        margin: '0 0.4em',
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
      },
      avatar:{
        height: '20px',
        width: '20px',
        borderRadius: '100%'
      },
      infoHolder:{
        display: 'flex',
        padding: '0.3em 1em',
        width: '100%',
        justifyContent: 'space-between',
        alignItems:'center',
        info:{
          display: 'flex',
          alignItems:'center',
          justifyContent: 'center',
          username:{
            fontWeight:'300',
            fontSize: '1em',
            marginLeft: '0.4em',
          }
        },

      }
    }



    return (
      <div style = {styles.holder}>
        <div style={styles.gif}>
          <textarea
            style={styles.embedHolder}
            ref={(textarea) => this.textArea = textarea}
            defaultValue={this.props.embed}
          />
          <div style={styles.msg}>
            Gif copy to clipboard
          </div>
        </div>
        <div style = {styles.infoHolder}>
          <div style ={styles.infoHolder.info} >
            <img src={this.state.avatar} style ={styles.avatar}/>
            <h2 style={styles.infoHolder.info.username}>{this.state.username}</h2>
          </div>
          <div>
            <i className="material-icons" style={[styles.link, styles.embed]} onClick={this.copyClipboard}>link</i>
            <i className="material-icons" style={styles.link} onClick={this.showHdGif}>visibility</i>
          </div>
        </div>
      </div>

    );
  }

}
Gifbox = Radium(Gifbox)
Gifbox = withRouter(Gifbox)
export default Gifbox;
