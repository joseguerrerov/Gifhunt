//Dependencies
import React,{Component} from 'react'
import Radium from 'radium'
import { SocialIcon} from 'react-social-icons';

//Assets

class Emptysearch extends Component{

  render(){

    const styles = {
      holder:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        color: '#171717',
        alignSelf: 'flex-start',
        marginTop: '3em'
      },
      title:{
        fontSize: '3em'
      },
      trending:{
        display: 'flex',
        border: ' 2px solid red',
        padding: '1em',
        borderRadius: '10px',
        message:{
          margin: '0'
        }
      }
    }

    return(
      <div style={styles.holder}>
        <h1 style={styles.title}>Ups, can't find that ...</h1>
        <div style={styles.trending}>
          <h2 style={styles.trending.message}>Check whats</h2>
          <i className="material-icons">whatshot</i>
        </div>
      </div>
    )
  }

}

Emptysearch = Radium(Emptysearch)
export default Emptysearch
