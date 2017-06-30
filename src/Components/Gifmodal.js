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

  preventClose = (e) =>{
    e.stopPropagation()
  }

  /*getRecomended=()=>{
  if(this.state.result){
  return(
  results.map((gif, index) =>
  <Gifbox
  action={this.gifAction}
  offset={index}
  fondoGif={gif.images.fixed_width.url}
  embed={gif.images.fixed_height.url}
  slug={gif.slug}
  show={gif.id}
  key={gif.id}
  user={gif.user}
  width="33.33%"
  height= '40vh'
  instant
  size="cover"
/>
)
)
}*/
//}

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
      backgroundColor: 'rgba(0,0,0,0.4)',
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
    }
  }

  return (
    <div style = {styles.modal} onClick={this.close}>
      <i className="material-icons" style={styles.close} onClick={this.close}>close</i>
      <Gifbox
        style={styles.gif}
        fondoGif={this.state.fondo}
        embed={this.state.embed}
        user={this.state.user}
        height="70vh"
        width="60%"
        size="contain"
        onClick={this.preventClose}
      />
    </div>
  );
}

}

Gifmodal = withRouter(Gifmodal)
Gifmodal = Radium(Gifmodal)
export default Gifmodal;
