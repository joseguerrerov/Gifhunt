//Dependencies
import React,{Component} from 'react'
import Radium from 'radium'
import { SocialIcon} from 'react-social-icons';

//Assets

class FeatFooter extends Component{

  render(){

    const styles = {
      holder:{
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        bottom: '2em',
        right: '0',
        color: '#E1E8E1'
      },
      text:{
        fontWeight: '300',
        fontSize: '1em',
        padding: '0 2em',
        '@media(max-width: 375px)':{
          padding: '0 1em',
        },
      },
      icons:{
        padding: '0 2em',
        '@media(max-width: 375px)':{
          padding: '0 1em',
        },
        icon:{
          height: '30px',
          width: '30px',
          margin: '0 0.5em',
        }
      }
    }

    const urls=[
      "https://github.com/joseguerrerov",
      "https://joseguerrero.surge.sh/"
    ]

    const year = new Date().getFullYear()

    return(
      <div style={styles.holder}>
        <h3 style={styles.text}>© {year} José Guerrero</h3>
        <div style={styles.icons}>
          <SocialIcon url={urls[0]} color="#E1E8E1" style={styles.icons.icon} />
          <SocialIcon url={urls[1]} color="#E1E8E1" style={styles.icons.icon} />
        </div>
      </div>
    )
  }

}

FeatFooter = Radium(FeatFooter)
export default FeatFooter
