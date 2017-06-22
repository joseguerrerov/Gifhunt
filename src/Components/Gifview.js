//Dependencies
import React,{Component} from 'react'
import Radium from 'radium'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

//Assets

class Gifview extends Component{

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  state = {
    result: true
  }

  componentDidMount(){
    this.props.onLoad(this.props.match.params.id)
  }

  componentWillReceiveProps(nextProps){
    //Cehck if the next gif array is empty or not
    if(nextProps.gif !== ''){
      console.log('estamos bien')
      this.setState({
        result: true
      })
    }else{
      this.setState({
        result: false
      })
    }
    //Check if a new search must start
    if(this.props.match.params.name !== nextProps.match.params.name ){
      console.log('tenemos que hacer algo');
      this.props.onLoad(nextProps.match.params.name)
      console.log('true')
    }
  }


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
    }

    return(

      <div style={styles.holder}>
        <h1>{this.props.match.params.id}</h1>
    </div>
  )
}

}


Gifview = Radium(Gifview)
Gifview = withRouter(Gifview)
export default Gifview
