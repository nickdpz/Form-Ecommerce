import React, { Component } from 'react';
import '../assets/styles/Home.css';
import api from '../utils/api';
// import ClipLoader from 'react-spinners/ClipLoader';

class Home extends Component {
	state = {
		loading: false,
		error: null,
	};

	async fetchData() {
        this.setState({ loading: true, error: null });
		try {
			const data = api.getProvinces();
			console.log(data);
		} catch (error) {
			this.setState({ error });
		}
	}

	componentDidMount() {
		this.fetchData();
	}

	render() {
		return (
			<>
				<main className="container-full"></main>
			</>
		);
	}
}

export default Home;
