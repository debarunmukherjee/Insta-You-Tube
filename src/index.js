import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SBar from '.\\components\\search_bar.js';
import VideoList from '.\\components\\video_list.js';
import VideoDetail from '.\\components\\video_detail.js';

const API_KEY = 'AIzaSyCOfOpR5nPxlMNi0MlDBqws_sovpYpPvIQ';


class App extends Component{
	constructor (props){
		super(props);

		this.state={
			videos: [],
			selectedVideo: null,
			searchTerm: ''
		};

		YTSearch ({key: API_KEY, term: this.state.searchTerm}, (videos) => {
			this.setState({
				videos: videos,
				selectedVideo: videos[0]
			});
		});
	}
	render(){
		const delayVidSearch = _.debounce( searchTerm => {
													this.setState({searchTerm});
													YTSearch ({key: API_KEY, term: this.state.searchTerm}, (videos) => {
														this.setState({
															videos: videos,
														});
													});
												},300);
		return(	

				<div>
					<SBar 
						onSearch={ delayVidSearch } />
					<VideoDetail video={this.state.selectedVideo} />
					<VideoList 
						onVideoSelect={ selectedVideo => this.setState({selectedVideo}) } 
						vid={this.state.videos} />
				</div>
			);
	}
}

//Display the html in the page

ReactDOM.render(<App />, document.querySelector('.container'));
