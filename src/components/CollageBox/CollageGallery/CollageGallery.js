import React from 'react';
import propsType from 'prop-types';

import classes from './CollageGallery.module.scss';
import Aux from './../../../HOC/Auxilary';
import GalleryImage from './GalleryImage/GalleryImage';

const CollageGallery = ( props ) => {

  const Images = props.imageList.map(
    (imgObj, idx) => {
      return (
        <GalleryImage 
          key={`${imgObj.id}__${imgObj.author}`} 
          img={imgObj} 
          imgClick={ () => { props.addCanvasImage( imgObj ) } }
        />
      );
    }
  );

  return (
    <Aux>
      <div className={classes.CollageGalleryHeader} >
        <div className={classes.title} >
          <h1>Gallery</h1>
        </div>
        <div className={classes.actionCtn} >
          <div 
            className={classes.refreshBtn} 
            onClick={ props.refreshGalleryImage }
          >
            <i className="fas fa-sync"></i>
          </div>
        </div>
      </div>
      <div className={classes.CollageGalleryImagesCtn} >
        <div className={classes.CollageGalleryImages} >
          {Images}
        </div>
      </div>
    </Aux>
  );
}

CollageGallery.propsType = {
  imageList: propsType.array.isRequired,
}

export default CollageGallery;