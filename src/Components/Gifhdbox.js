//Dependencies
import React,{Component} from 'react'
import Radium from 'radium'





class Gifview extends Component{

  state={
    fondo : this.props.fondoGif,
    copyStatus: false,
    msgDisplay: 'none',
    username: 'Giphy',
    avatar: 'https://media1.giphy.com/avatars/studiosoriginals/j3JBzK5twdv8.jpg',
    profileUrl : 'https://giphy.com/'
  }


  render(){

    const styles = {
      holder:{
        display: 'flex',
        position: 'relative',
        backgroundColor: '#fafafa',
        backgroundImage: `url(${this.state.fondo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '80vh',
        width: '60%',
        margin: 'auto'
      },
    }

    return(

      <div style={styles.holder}>

      </div>
    )
  }

}


Gifview = Radium(Gifview)
export default Gifview
