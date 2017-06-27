//Dependencies
import React,{Component} from 'react'
import Radium from 'radium'
import { SocialIcon} from 'react-social-icons';

//Assets

class FeatFooter extends Component{

  render(){

    const styles = {
      holder:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: '2em 0',
        color: '#3d3d3d'
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
          <SocialIcon url={urls[0]} color="#3d3d3d" style={styles.icons.icon} />
          <SocialIcon url={urls[1]} color="#3d3d3d" style={styles.icons.icon} />
        </div>
      </div>
    )
  }

}

FeatFooter = Radium(FeatFooter)
export default FeatFooter
