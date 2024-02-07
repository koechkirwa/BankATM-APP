import React from 'react';
import {Link} from 'react-router-dom';
import './MenuButton.css';

export const MenuButton = (props) => {
  return (
    <Link to = '/menu' className = 'exit-button'>
     <button>{props.text}</button>
    </Link>
  )
}
