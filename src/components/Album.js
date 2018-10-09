import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';
import './Album.css';

class Album extends Component {
  constructor(props) {
		super(props);
		   
		const album = albumData.find( album => {
		  return album.slug === this.props.match.params.slug
		});
 
    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      volume: 0, 
      isPlaying: false,
      hover: null
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
 	}

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }
 
  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }   

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      },
      volumechange: e => {
      	this.setState({ volume: this.audioElement.volume});
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange);
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.removeEventListener('volumechange', this.eventListeners.volumechange);
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  formatTime(seconds) {
  	if(isNaN(seconds)) {
  		return "-:--";
  	}
		var min = Math.floor(seconds/60);
  	var sec = Math.floor(seconds - min * 60).toString().padStart(2, '0');
  	return min + ':' + sec;
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
   	if (this.state.isPlaying && isSameSong) {
    	this.pause();
    } else {
    if (!isSameSong) { this.setSong(song); }     
    	this.play();
	  }
  }

  handlePrevClick() {
	  const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    let newIndex = currentIndex - 1;
		if (newIndex < 0  ) {
    	newIndex =  this.state.album.songs.length -1;
    } 
	  const newSong = this.state.album.songs[newIndex];
	  this.setSong(newSong);
	  this.play();
  }

  handleNextClick() {
	  const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
		let newIndex = currentIndex + 1;
		if (newIndex >= this.state.album.songs.length ) {
    	newIndex = 0;
    } 
		const newSong = this.state.album.songs[newIndex];
		this.setSong(newSong);
		this.play();
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }

  handleVolumeChange(e) {
    const newVolume = e.target.value;
    this.audioElement.volume = newVolume;
    this.setState({ volume: newVolume });
  }

  handleHoverChange(song) {
 	  this.setState({ hover: song });	
  }

  render() {
    return (
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>  
          <tbody>
            {this.state.album.songs.map((song, index) => {
           	  let icon = index + 1;
           		if (this.state.isPlaying && this.state.currentSong === song) {
           			icon = <span className = "ion-md-pause"></span>;
           		} else if (this.state.hover === song || (!this.state.isPlaying && this.state.currentSong === song)) {
           			icon = <span className = "ion-md-play"></span>;
           		}
              let className='';
              if (this.state.currentSong === song) {
                className = 'Playing';
              }

           		return (
		           	<tr 
		           		key={song.title + this.state.album.title}
		           		onClick={() => this.handleSongClick(song)}
		           		onMouseEnter={() => this.handleHoverChange(song)} 
		           		onMouseLeave={() => this.handleHoverChange(null)}
                  className={className}>
		              <td> {icon} </td>
		              <td> {song.title} </td>
		              <td> {this.formatTime(song.duration)} </td>
		            </tr>
		          );
	          })}
          </tbody>
        </table>
        <PlayerBar
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          currentTime={this.audioElement.currentTime}
          formattedTime={this.formatTime(this.audioElement.currentTime)}
          volume={this.audioElement.volume}
          duration={this.audioElement.duration}
          formattedDuration={this.formatTime(this.audioElement.duration)}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
          handleTimeChange={(e) => this.handleTimeChange(e)}
          handleVolumeChange={(e) => this.handleVolumeChange(e)}
        />
      </section>
    );
  }
}

export default Album;
 