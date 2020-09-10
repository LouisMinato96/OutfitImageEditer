import React, { useEffect, createRef } from 'react';

// import classes from './CollageCanvas.module.scss';

const CollageCanvas = ( props ) => {

  const canvasRef = createRef();

  const drawImageOnCanvas = ( posX, posY ) => {
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect( 0, 0, canvas.width, canvas.height );

    ctx.drawImage(  
      props.canImg.HTMLImage, 
      posX,
      posY,
      200, 
      200 
    );
  }

  const drawImageOnCanvasWithBorder = ( posX, posY ) => {

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect( 0, 0, canvas.width, canvas.height );

    ctx.drawImage(  
      props.canImg.HTMLImage, 
      posX,
      posY,
      200, 
      200 
    );
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 4;
    ctx.strokeRect( 
      posX,
      posY,
      200, 
      200 
    );
  }

  const canZindex = props.selectedIndex === props.canindex ? 1000 : ( props.canindex + 100 );

  useEffect( () => {

    props.canImg.HTMLImage.onload = () => {
      drawImageOnCanvas( props.canImg.ImagePosX, props.canImg.ImagePosY );
    }
    // eslint-disable-next-line
  }, []);

  useEffect( () => {
    // console.log( 'Selected Index Change', props.canindex );

    if( props.selectedIndex === props.canindex ){
      drawImageOnCanvasWithBorder( props.canImg.ImagePosX, props.canImg.ImagePosY );
    }else{
      drawImageOnCanvas( props.canImg.ImagePosX, props.canImg.ImagePosY );
    }
  // eslint-disable-next-line  
  }, [props.selectedIndex]);

  let LastPosX = props.canImg.ImagePosX;
  let LastPosY = props.canImg.ImagePosY;

  const captureMousePosition = ( event ) => {
    const posX = event.clientX - 25 ;
    const posY = event.clientY - 175;
    LastPosX = posX;
    LastPosY = posY;
    // console.log( 'Capture', posX , posY );
    drawImageOnCanvasWithBorder( posX, posY );
  }

  const setForMoveImage = (event) => {
    console.log( 'CanvasMouseDown', props.canindex );
    canvasRef.current.addEventListener( 'mousemove', captureMousePosition );
  }

  const resetForMoveImage = (event) => {
    console.log( 'CanvasMouseUp', props.canindex );
    
    props.setPosition( LastPosX, LastPosY );

    canvasRef.current.removeEventListener( 'mousemove', captureMousePosition );
    
  }

  return (
    <canvas 
      style={ { position: 'absolute', top: '0px', left: '0px', zIndex: canZindex } }
      width={props.canWidth} 
      height={props.canHeight} 
      ref={ canvasRef }
      onMouseDown={ () => { setForMoveImage() } }
      onMouseUp={ () => { resetForMoveImage() } }
      onMouseOut={ () => { resetForMoveImage() } }
    >
    </canvas>
  );
}

export default CollageCanvas;