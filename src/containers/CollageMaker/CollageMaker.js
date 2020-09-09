import React, { Component } from 'react';

import classes from './CollageMaker.module.scss';
import Collage from './../../components/CollageBox/Collage/Collage';
import CollageGallery from './../../components/CollageBox/CollageGallery/CollageGallery';

class CollageMaker extends Component{

  state = {
    canvasImages: [],
    galleryImages : []
  }

  getGalleryImages = () => {

    this.setState( { galleryImages: [] } )
    const randomImegeListURL = `https://picsum.photos/v2/list?page=1&limit=20`; // ${ Math.floor( Math.random() * 10 ) + 1 }

    fetch( randomImegeListURL )
      .then(res => res.json())
      .then(
        res => {
          // console.log( 'Images', res );
          this.setState( { galleryImages: res } )
        },
        err => {
          console.error( err );
        }
      );
  }

  resetGalleryImages = () => {
    this.getGalleryImages();
    console.log( 'Reset GalleryImages' );
  }

  setCanvasImagePosition = ( idx, posX, posY ) => {
    
    const oldCanImgAtIDX = this.state.canvasImages[idx] ;
    const updatedCanImgAtIDX = { ...oldCanImgAtIDX , ImagePosX : posX , ImagePosY : posY };

    const updatedCanvasImages = [ ...this.state.canvasImages ];
    updatedCanvasImages[idx] = updatedCanImgAtIDX;

    this.setState( { canvasImages : updatedCanvasImages } );
  }

  addImageTocanvas = ( img ) => {
    const newCanvasImage = [...this.state.canvasImages];

    const isAlreadyAdded = newCanvasImage.filter( e => e.id === img.id ).length > 0;
    if( isAlreadyAdded ){
      alert( 'Already Added !!! ' );
      return;
    }
    const image = new Image();
    image.src = img.download_url;

    newCanvasImage.push( {
      ...img, 
      HTMLImage: image, 
      ImagePosX : ( newCanvasImage.length * 50 ), 
      ImagePosY : ( newCanvasImage.length * 100 ) 
    } );

    console.log( 'Image Added in CanvasImage' );
    this.setState( { canvasImages : newCanvasImage } );
  }

  removeImageTocanvas = ( idx ) => {
    const newCanvasImage = [...this.state.canvasImages];
    newCanvasImage.splice( idx, 1 );
    console.log( 'Image Removed from CanvasImage' );
    this.setState( { canvasImages : newCanvasImage } );
  }

  resetCanvesImages = () => {
    this.setState( { canvasImages: [] } );
    console.log( 'Reset CanvasImage' );
  }

  componentDidMount() {
    this.getGalleryImages();
  }

  render(){
    return (
      <div className={classes['CollageMaker-container']} >
        <div className={classes['CollageBox-container']} >
          <Collage 
            imageList={ this.state.canvasImages }
            resetCanvesImages={ this.resetCanvesImages }
            setCanvasImagePosition={ this.setCanvasImagePosition }
            removeCanvasImage={ this.removeImageTocanvas }
          />
        </div>
        <div className={classes['CollageBox-gallery']} >
          <CollageGallery 
            imageList={ this.state.galleryImages }
            addCanvasImage={ this.addImageTocanvas }
            refreshGalleryImage={ this.resetGalleryImages }
          />
        </div>
      </div>
    );
  }
}

export default CollageMaker;