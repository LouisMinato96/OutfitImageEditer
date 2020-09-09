import React from 'react';

import classes from './GalleryImage.module.scss';

const GalleryImage = ( props ) => {

  return (
    <div 
      className={ classes.imageCtn } 
      onClick={ props.imgClick }
    >
      <img src={props.img.download_url} />
    </div>
  );
}

export default GalleryImage;