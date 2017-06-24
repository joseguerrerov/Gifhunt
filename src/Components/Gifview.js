//Dependencies
import React, { Component } from 'react'
import Radium from 'radium'
import {withRouter} from 'react-router-dom'


//Components
import Gifbox from './Gifbox'

class Gifview extends Component {

  state = {
    result: false,
  }

  componentDidMount(){
    this.props.onLoad(this.props.match.params.id)
    console.log(this.props.gif);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.gif){
      console.log(nextProps.gif.images.fixed_height.url);
      this.setState({
        result: true,
        gif : nextProps.gif,
        fondo: nextProps.gif.images.downsized_medium.url,
        embed: nextProps.gif.images.fixed_height.url,
        user: nextProps.gif.user,
      })
    }
  }


  getRecomended=()=>{

  }

  render() {


    const styles = {
      searchResults: {
        minHeight: 'calc(100vh - 76px)',
        width: '100%',
        padding: '0 0.5em',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
      },
    }

    return (
      <div style = {styles.searchResults}>
        <Gifbox
          fondoGif={this.state.fondo}
          embed={this.state.embed}
          user={this.state.user}
          height="70vh"
          width="60%"/>
          <div style= {styles.recomended}>
            {this.getRecomended()}
          </div>
        </div>
      );
    }

  }

  Gifview = withRouter(Gifview)
  Gifview = Radium(Gifview)
  export default Gifview;
