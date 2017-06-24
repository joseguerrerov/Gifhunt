//Dependencies
import React, { Component } from 'react'
import Radium from 'radium'
import {withRouter} from 'react-router-dom'


//Components
import Gifbox from './Gifbox'

class Gifview extends Component {

  state = {
    result: false
  }

  componentDidMount(){
    this.props.onLoad(this.props.match.params.id)
    console.log(this.props.gif);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.gif){
      console.log('run');
      this.setState({
        gif : nextProps.gif,
        result: true
      })
    }
  }



  getGifs = () =>{
    if(this.state.result){
      console.log(this.state.gif);
      return(
        <Gifbox
          fondoGif={this.state.gif.images.downsized_large.url}
          embed={this.state.gif.images.fixed_height.url}
          user={this.state.gif.user}
          height="70vh"
          width="60%"/>
      )
    }else if (!this.state.result){
      console.log('hola');

    }
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
        {this.getGifs()}
      </div>
    );
  }

}

Gifview = withRouter(Gifview)
Gifview = Radium(Gifview)
export default Gifview;
