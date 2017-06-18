//Dependencies
import React,{Component} from 'react'
import Radium from 'radium'
import { SocialIcon} from 'react-social-icons';

//Assets

class Redirectsearch extends Component{

componentWillMount(){
  const path = `/search/trending`
  this.props.history.push(path)
}

render (){
  return(
    <span></span>
  )
}

}

export default Redirectsearch
