import React, { Component } from 'react';
import '../assets/styles/Home.css';
import api from '../utils/api';
// import ClipLoader from 'react-spinners/ClipLoader';

class Home extends Component {
	state = {
        loading: false,
        error: null
	};

	fetchData = async (value = 1) => {
		this.setState({ loading: true, error: null });
	};

	componentDidMount() {
		this.fetchData();
	}

	render() {
		return (
			<>
				<main className="container-full">
				</main>
			</>
		);
	}
}

export default Home;
