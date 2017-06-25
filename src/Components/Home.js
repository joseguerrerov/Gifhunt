//Dependencies
import React, { Component } from 'react'
import Radium from 'radium'
import axios from 'axios'


//Components
import Showgif from './Showgif'
import FeatFooter from './FeatFooter'

class Home extends Component {


  state = {
    gifs: [],
    boxSize:[]
  }

  //Get 8 trending gifs
  componentWillMount(){
    axios.get('https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC&limit=1')
    .then(response => {
      this.setState({
        gifs: response.data.data,
        loading: false,
      })
    })
    .catch(error => {
      console.log('Error fetching and parsing data');
    })
  }


  render() {
    const results = this.state.gifs
    let gifs
    if(results.length > 0 ){
      gifs = results.map(gif =>
        <Showgif fondoGif={gif.images.downsized.url} fondo={gif.images.original_still.url} key={gif.id}/>
      )
    }

    const styles = {
      homeComponent: {
        height: '100vh',
        Width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#000',
      },
      info:{
        height: '100vh',
        backgroundColor: '#fff',
        position:'absolute',
        top: '100vh',
        width: '100%',
      },
      t:{
        height: '100vh',
      }
    }

    return (
      <div style={styles.t}>
        <div style = {styles.homeComponent}>
          {gifs}
        </div>
        <FeatFooter/>
      </div>
    )
  }

}

Home = Radium(Home)
export default Home;
