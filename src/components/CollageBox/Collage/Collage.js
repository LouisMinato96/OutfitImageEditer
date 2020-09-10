import React, { useEffect, useState, createRef } from 'react';

import classes from './Collage.module.scss';
import Aux from './../../../HOC/Auxilary';
import CollageCanvas from './CollageCanvas/CollageCanvas';

const Collage = ( props ) => {

  const CollageCanvasRef = createRef();
  const [ selectedCanvasIndex, selectedCanvasIndexSetState ] = useState( -1 );
  const [ canvasDimension, canvasDimentionSetState ] = useState( { width: 0, height: 0 } );
  
  useEffect( () => {
    canvasDimentionSetState(
      {
        width: CollageCanvasRef.current.clientWidth, 
        height: CollageCanvasRef.current.clientHeight
      }
    );
    // eslint-disable-next-line
  }, []);

  const Layers = [];

  const CanvasImages = props.imageList.map(
    (img, idx) => {

      const layerClasses = [ classes.layer ];
      if( selectedCanvasIndex === idx ){
        layerClasses.push( classes.selectedLayer );
      }
      Layers.push( 
        <div 
          className={layerClasses.join(' ')} 
          key={`layer_${idx}`} 
          onClick={ () => { selectedCanvasIndexSetState( idx ); } }
        > 
          {`Layer ${idx}`} 
        </div>
       );

      return (
        <CollageCanvas 
          key={`${img.id}__${img.author}`}
          canindex={ idx }
          canImg={ img }
          setPosition={ ( posX, posY ) => { props.setCanvasImagePosition( idx, posX, posY ); } }
          canWidth={ canvasDimension.width }
          canHeight={ canvasDimension.height }
          selectedIndex={ selectedCanvasIndex }
        />
      );
    }
  );

  const saveCanvas = () => {
    const cans = document.getElementsByTagName('canvas'); 
    
    const canImages = [];

    Object.keys( cans ).forEach(
      ( canKey ) => {
        const img = new Image();
        const data = cans[ canKey ].toDataURL("image/png");
        img.onload = () => {
          canImages.push( img );
        }
        img.src = data;
      }
    );

    setTimeout( () => {

      const newCanvas = document.createElement( 'canvas' );
      newCanvas.width = canvasDimension.width;
      newCanvas.height = canvasDimension.height;
      const ctx = newCanvas.getContext('2d');
  
      canImages.forEach(
        ( img ) => {
          ctx.drawImage( img, 0, 0, newCanvas.width, newCanvas.height );
        }
      );
  
      // newCanvas.style.position = 'fixed';
      // newCanvas.style.top = '0px';
      // newCanvas.style.left = '0px';
      // newCanvas.style.backgroundColor = 'red';
      // newCanvas.style.zIndex = 99999;
      // document.getElementsByTagName('body')[0].append( newCanvas );     
      
      const data = newCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      window.location.href=data;

    }, 1000 );

  }

  return (
    <Aux>
      <div className={classes.CollageHeader} >
        <div className={classes.title} >
          <h1>Collage Maker</h1>
        </div>
        <div className={classes.actionCtn} >
          <div 
            className={classes.refreshBtn} 
            onClick={ props.resetCanvesImages }
          >
            <i className="fas fa-sync"></i>
          </div>
          <div 
            className={classes.saveBtn} 
            onClick={ saveCanvas }
          >
            <i className="fas fa-save"></i>
          </div>
        </div>
      </div>
      <div className={classes.CollageCanvasCtn} >
        <div className={classes.CollageCanvas} ref={CollageCanvasRef} >
          { CanvasImages }
        </div>
        <div className={classes.canvasLayers} >
          { Layers }
        </div>
      </div>
    </Aux>
  );
}

export default Collage;