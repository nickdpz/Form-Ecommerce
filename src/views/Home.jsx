import React, { Component } from 'react';
import '../assets/styles/Home.css';
import api from '../utils/api';
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';
import ProductList from '../components/ProductList';
import FormUser from '../components/FormUser';

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
		locations: [],
	};

	async fetchData() {
		this.setState({ loading: true, error: null });
		let data;
		try {
			data = await api.getProvinces('11000');
			this.setState({ locations: data.colonies });
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
			<div className="mt-3 w-100">
				<div className="sweet-loading my-4">
					{this.state.loading && <div className="d-flex justify-content-center my-5">
						<h4>Espera mientras cargan los productos</h4>1
						</div>}

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
						<FormUser locations={this.state.locations}/>
					</>
				)}
			</div>
		);
	}
}

export default Home;
