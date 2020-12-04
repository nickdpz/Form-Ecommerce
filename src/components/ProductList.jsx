import React from 'react';
import numeral from 'numeral';
import '../assets/styles/ProductList.css';
import { Button } from '@material-ui/core';

export default function ProductList({ products }) {
	console.log(products);
	const moneyFilter = function (value) {
		if (!value) {
			return '$ 0';
		}
		return numeral(value).format('($ 0,000)');
	};
	return (
		<div className="">
			<div className="d-flex justify-content-center align-content-center flex-column">
				<div className="text-center">
					<h4 className="alert alert-secondary">RESUMEN DE ORDER</h4>
				</div>
				<div className="row">
					{products.map((item, index) => (
						<div
							key={index}
							className="col-xl-6 col-lg-6 col-12 d-flex align-content-lg-start justify-content-around py-3 border-low"
						>
							<img src={item.image} alt={item.name} />
							<div className="row m-3">
								<h6 className="text-secondary col-8 px-2">{item.name}</h6>
								<div className="col-4 px-2 ">
									<div className="d-flex align-items-end ">
										<strong>{moneyFilter(item.price)}</strong>
										<small>.00</small>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
				<div className="row px-5 d-flex justify-content-end mt-3">
					<Button variant="contained" color="secondary">
						Editar
					</Button>
				</div>
				<div className="row"></div>
			</div>
		</div>
	);
}
