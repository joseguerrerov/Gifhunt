//Dependencies
import React, { Component } from 'react'
import Radium from 'radium'


//Components

class Gifbox extends Component {

  state = {
    width: this.props.width,
    fondo : this.props.fondoGif,
    copyStatus: false,
    msgDisplay: 'none'
  }

  //Funcion para copiar el link al clipboard
  copyClipboard = () =>{
    console.log('se supone que tienes que copiar en este punto');
    console.log(this.props.embed);
    let textField = document.createElement('textarea')
    textField.innerText = this.props.embed
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
    this.setState({
      copyStatus: true,
      msgDisplay: 'inherit',
    })
    setTimeout(function() {
      this.setState({
        copyStatus: false,
        msgDisplay: 'none',
      });
    }.bind(this), 1500);
  }



  render() {

    const styles = {
      holder: {
        position: 'relative',
        width: `calc(100% - 1em)`,
        height: '30vh',
        margin: '0.5em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fafafa',
        backgroundImage: `url(${this.state.fondo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        '@media (min-width: 600px)': {
          width: `calc(${this.state.width} - 1em)`,
        }
      },
      embed: {
        color: 'rgba(255,255,255,.5)',
        position: 'absolute',
        top: '0.5em',
        right: '0.5em',
        cursor: 'pointer'
      },
      link:{
        color: 'rgba(255,255,255,.5)',
        position: 'absolute',
        top: '0.5em',
        left: '0.5em'
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
      }
    }

    return (
      <div style = {styles.holder}>
        <i className="material-icons" style={styles.embed} onClick={this.copyClipboard}>link</i>
        <a href ={this.props.embed} style={styles.link} target="_blank">
          <i className="material-icons">visibility</i>
        </a>
        <div style={styles.msg}>
          Gif copy to clipboard
        </div>
      </div>

    );
  }

}

Gifbox = Radium(Gifbox)
export default Gifbox;
