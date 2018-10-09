import React, { Component } from 'react';
import './PlayerBar.css';
 
class PlayerBar extends Component {


	render() {
	  return (
	    <section className="player-bar">
	      <section id="buttons">
	        <div id="previous">
	          <span className="ion-md-skip-backward" onClick={this.props.handlePrevClick}></span>
	        </div>
	        <div id="play-pause" >
	        	<span className={this.props.isPlaying ? 'ion-md-pause' : 'ion-md-play'} onClick={this.props.handleSongClick}></span>
	        </div>
	        <div id="next">
	        	<span className="ion-md-skip-forward" onClick={this.props.handleNextClick}></span>
	        </div>
		    </section>
		    <div className='sliders'>
			    <section id="time-control">
			      <div className="current-time">{this.props.formattedTime}</div>
			        <input 
				        type="range" 
				        className="seek-bar" 
				        value={(this.props.currentTime / this.props.duration) || 0} 
				        max="1" 
				        min="0" 
				        step="0.01"
				        onChange={this.props.handleTimeChange} 
			        />   
			      <div className="total-time">{this.props.formattedDuration}</div> 
			    </section>
			    <section id="volume-control">
			      <div className="icon ion-md-volume-low"></div>
				      <input 
				        type="range" 
				        orient="vertical"
				        className="seek-bar" 
				        value={(this.props.volume || 0)}
				        max="1" 
				        min="0" 
				        step="0.01"
				        onChange={this.props.handleVolumeChange} 
				        />
			      <div className="icon ion-md-volume-high"></div>
		    	</section>
		    </div>
	  	</section>
		);
	}
}

export default PlayerBar