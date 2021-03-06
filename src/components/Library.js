import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';
import './Library.css';

 class Library extends Component { 
   constructor(props) {
     super(props);
     this.state = { albums: albumData };
   }
   render() {
    return ( 
      <section className='library'>
        {
          this.state.albums.map( (album, index) => 
            <Link to={`/album/${album.slug}`} key={index} className='albumLink'>
              <div className='album'>
              	<img src={album.albumCover} alt={album.title} />
                <div className='album-details'>
	                <div className='title'>{album.title}</div>
	                <div className='artist'>{album.artist}</div>
	                <div className='numSongs'>{album.songs.length} songs</div>
	              </div> 
	            </div>  
            </Link>
          )
        }
      </section>
     );
   }
 }

export default Library;