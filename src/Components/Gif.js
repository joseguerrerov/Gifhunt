import React from 'react';
import loadIcon from '../img/Loading_icon.gif';

const Gif = props => {

  return (
    <li className="gif-wrap">
      {/*}<img src = {props.url}/>{*/}
      <img src = {props.url_L}/>
    </li>
  );

}

export default Gif;
