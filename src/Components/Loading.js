//Dependencies
import React, { Component } from 'react'
import Radium from 'radium'



//Assets
import loading from '../Img/loading.gif'

class Loading extends Component {

  render() {

    const styles = {
      loading:{
        position: 'absolute',
        top: '0',
        left: '0',
        display: 'flex',
        width: '100%',
        height:'calc(100% - 42px)',
        alignItems: 'center',
        justifyContent: 'center'
      },
      img:{
        height: '100px',
        width: '100px'
      }
    }

    return (
      <div style = {styles.loading}>
        <img style={styles.img} src={loading} />
      </div>
    )
  }

}

Loading = Radium(Loading)
export default Loading;
