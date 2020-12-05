import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import { Button, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { setProducts } from '../store/actions/products';
import '../assets/styles/ProductList.css';

export const ProductList = (props) => {
	const moneyFilter = function (value) {
		if (!value) {
			return '$ 0';
		}
		return numeral(value).format('($ 0,000)');
	};

	const [edit, setEdit] = useState(false);

	const [total, setTotal] = useState(0);

	const [products, setProducts] = useState(props.products); //eslint-disable-line

	useEffect(() => {
		const changeTotal = () => {
			let count = 0;
			for (const product of products) {
				count = count + Number(product.price);
			}
			setTotal(count);
		};
		changeTotal();
	}, [products]);

	const enableEdit = () => {
		setEdit(!edit);
	};

	const changeTotalProducts = (name) => {
		let aux = products.filter((item) => item.name !== name);
		setProducts(aux);
		props.setProducts(aux)
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
							{edit && (
								<div>
									<IconButton
										color="secondary"
										component="span"
										onClick={() => changeTotalProducts(item.name)}
									>
										<DeleteIcon />
									</IconButton>
								</div>
							)}
						</div>
					))}
				</div>
				<div className="row px-5 d-flex justify-content-end my-3">
					<Button variant="contained" color="secondary" onClick={enableEdit}>
						Editar
					</Button>
				</div>
				<div className="row bg-gray-light d-flex justify-content-around p-3">
					<div className="">
						<h5 className="text-dark">Subtotal</h5>
						<h5 className="text-dark">Envio</h5>
					</div>
					<div>
						<div className="d-flex align-items-end mt-1">
							<strong className="text-dark">{moneyFilter(total)}</strong>
							<small className="text-dark">.00</small>
						</div>
						<p className="text-dark mt-1">A calcular</p>
					</div>
				</div>
				<div className="row bg-dark d-flex justify-content-around p-3">
					<div className="">
						<h5 className="text-white">Total</h5>
					</div>
					<div>
						<div className="d-flex align-items-end ">
							<strong className="text-white">{moneyFilter(total)}</strong>
							<small className="text-white">.00</small>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapDispatchToProps = {
	setProducts,
};

export default connect(null, mapDispatchToProps)(ProductList);
