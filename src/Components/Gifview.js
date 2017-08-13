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
    window.scrollTo(0, 0)
    this.props.onLoad(this.props.match.params.id)
    //console.log(this.props.gif);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.gif){
      //console.log(nextProps.gif.images.fixed_height.url);
      this.setState({
        result: true,
        gif : nextProps.gif,
        fondo: nextProps.gif.images.downsized_large.url,
        embed: nextProps.gif.images.fixed_height.url,
        user: nextProps.gif.user,
      })
    }
  }

  /*getRecomended=()=>{
  if(this.state.result){
  return(
  results.map((gif, index) =>
  <Gifbox
  action={this.gifAction}
  offset={index}
  fondoGif={gif.images.fixed_width.url}
  embed={gif.images.fixed_height.url}
  slug={gif.slug}
  show={gif.id}
  key={gif.id}
  user={gif.user}
  width="33.33%"
  height= '40vh'
  instant
  size="cover"
/>
)
)
}*/
//}

render() {

  const setMarginTop = () => (
    this.props.isMobile ? '67px' : '2em'
  )

  const setalign = () =>(
    this.props.isMobile ? 'flex-start' : 'center'
  )

  const styles = {
    searchResults: {
      minHeight: 'calc(100vh - 76px)',
      width: '100%',
      padding: '0 0.5em',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: setalign(),
      justifyContent: 'center',
      backgroundColor: '#fafafa',
      marginTop: setMarginTop(),
    },
  }

  return (
    <div style = {styles.searchResults}>
      <Gifbox
        fondoGif={this.state.fondo}
        embed={this.state.embed}
        user={this.state.user}
        height="70vh"
        width="60%"
        size="contain"
      />
    </div>
  );
}

}

Gifview = withRouter(Gifview)
Gifview = Radium(Gifview)
export default Gifview;
