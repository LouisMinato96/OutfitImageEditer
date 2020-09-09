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