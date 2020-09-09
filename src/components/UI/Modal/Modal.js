import React from 'react';

import classes from './Modal.module.scss';
import Aux from './../../../HOC/Auxilary';
import BackDrop from './../BackDrop/BackDrop';

const Modal = ( props ) => {
  return (
    <Aux>
      <BackDrop show={props.show} click={props.closeModal} />
      <div 
        className={classes.Modal} 
        style={
          { 
            transform: props.show ? 'translateY( 0vh )' : 'translateY( -100vh )' ,
            opacity: props.show ? '1' : '0'
          }
        }
      >
        { props.children }
      </div>
    </Aux>
  );
}

export default Modal;
