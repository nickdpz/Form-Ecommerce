import React, { Component } from 'react';
import '../assets/styles/Home.css';
import api from '../utils/api';
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';
import ProductList from '../components/ProductList';

const override = css`
	display: block;
	margin: 0 auto;
	border-color: blue;
`;

class Home extends Component {
	state = {
		loading: true,
		error: null,
		products: [],
		provinces: [],
	};

	async fetchData() {
		this.setState({ loading: true, error: null });
		let data;
		try {
			data = await api.getProvinces();
			this.setState({ provinces: data });
			data = await api.getProducts();
			this.setState({ products: data });
			this.setState({ loading: false, error: null });
		} catch (error) {
			this.setState({ error });
		}
	}

	componentDidMount() {
		this.fetchData();
	}

	render() {
		return (
			<div className="mt-3 mx-4 w-100">
				<div className="sweet-loading mt-4">
					<ClipLoader
						css={override}
						size={150}
						color={'#123abc'}
						loading={this.state.loading}
					/>
				</div>
				{!this.state.loading && (
					<>
						<ProductList products={this.state.products} />
					</>
				)}
			</div>
		);
	}
}

export default Home;
