import { connect } from 'react-redux';
import React, { useState } from 'react';
import sweetAlert from 'sweetalert2';
import api from '../utils/api';
import {
	TextField,
	Checkbox,
	InputAdornment,
	FormControlLabel,
	MenuItem,
} from '@material-ui/core';

import {
	AccountCircle,
	MailOutline,
	Phone,
	LocationOn,
	PinDrop,
	Map,
} from '@material-ui/icons';

export const FormUser = (props) => {
	const [state, setState] = useState({
		name: '',
		lastName: '',
		phone: '',
		email: '',
		region: '',
		city: '',
		neighborhood: '',
		address: '',
		code: '11000',
		location: props.locations[0],
		locations: props.locations,
		check: false,
		isEmail: true,
		isName: true,
		isLastName: true,
		isPhone: true,
		isRegion: true,
		isCity: true,
		isNeighborhood: true,
		isAddress: true,
		isLocation: true,
		loading: false,
	});

	const handleCheck = () => {
		setState({ ...state, check: !state.check });
	};

	const validator = (name, value) => {
		let out = false;
		switch (name) {
			case 'email':
				out = /^[\u00f1\u00d1\w._-]{3,25}@[\w.-]{3,30}\.\w{2,5}$/.test(value);
				setState({
					...state,
					isEmail: out,
					email: value,
				});
				break;
			case 'name':
				out = !!value;
				setState({
					...state,
					isName: out,
					name: value,
				});
				break;
			case 'lastName':
				out = !!value;
				setState({
					...state,
					isLastName: out,
					lastName: value,
				});
				break;
			case 'phone':
				out = !!value;
				setState({
					...state,
					isPhone: out,
					phone: value,
				});
				break;
			case 'region':
				out = !!value;
				setState({
					...state,
					isRegion: out,
					region: value,
				});
				break;
			case 'city':
				out = !!value;
				setState({
					...state,
					isCity: out,
					city: value,
				});
				break;
			case 'neighborhood':
				out = !!value;
				setState({
					...state,
					isNeighborhood: out,
					neighborhood: value,
				});
				break;
			case 'address':
				out = !!value;
				setState({
					...state,
					isAddress: out,
					address: value,
				});
				break;
			case 'location':
				out = !!value;
				setState({
					...state,
					isLocation: out,
					location: value,
				});
				break;
			default:
				setState({ ...state, [name]: value });
				break;
		}
	};

	function validatorInfo() {
		let isEmail = /^[\u00f1\u00d1\w._-]{3,25}@[\w.-]{3,30}\.\w{2,5}$/.test(
			state.email
		);
		let isName = state.name !== '';
		let isLastName = state.lastName !== '';
		let isPhone = state.phone !== '';
		let isRegion = state.region !== '';
		let isCity = state.city !== '';
		let isNeighborhood = state.neighborhood !== '';
		let isAddress = state.address !== '';
		setTimeout(() => {
			setState({
				...state,
				isEmail,
				isName,
				isLastName,
				isPhone,
				isRegion,
				isCity,
				isNeighborhood,
				isAddress,
			});
			console.log(state);
		}, 100);
		return (
			isEmail &&
			isName &&
			isLastName &&
			isPhone &&
			isRegion &&
			isCity &&
			isNeighborhood &&
			isAddress
		);
	}

	const handleClick = async () => {
		const rule = validatorInfo();
		if (rule) {
			try {
				setState({ ...state, loading: true });
				sweetAlert.showLoading();
				console.log({
					name: state.name,
					lastName: state.lastName,
					phone: state.phone,
					email: state.email,
					region: state.region,
					city: state.city,
					neighborhood: state.neighborhood,
					address: state.address,
					code: state.code,
					location: state.location,
					products: props.products.products,
					check: state.check,
				});
				let result = await api.createOrder({
					name: state.name,
					lastName: state.lastName,
					phone: state.phone,
					email: state.email,
					region: state.region,
					city: state.city,
					neighborhood: state.neighborhood,
					address: state.address,
					code: state.code,
					location: state.location,
					products: props.products.products,
					check: state.check,
				});
				sweetAlert.close();
				if (result === 200) {
					await sweetAlert.fire({
						title: 'Exíto !',
						icon: 'success',
						showConfirmButton: false,
						timer: 3000,
					});
				} else {
					sweetAlert.fire({
						title: 'Verifica los campos !',
						text: 'Abra la consola',
						icon: 'error',
					});
				}
			} catch (error) {
				sweetAlert.close();
				console.log(error);
				sweetAlert.fire({
					title: 'Verifica los campos !',
					text: 'Abra la consola',
					icon: 'error',
				});
			}
		} else {
			sweetAlert.fire({
				title: 'Valida los campos',
				icon: 'info',
			});
		}
		setState({ ...state, loading: false });
	};

	const handleChange = (event) => {
		validator(event.target.name, event.target.value);
	};

	const handleCode = async (event) => {
		try {
			const { colonies } = await api.getProvinces(event.target.value);
			setState({
				...state,
				code: event.target.value,
				locations: colonies,
				location: colonies[0],
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleLocation = (event) => {
		setState({ ...state, location: event.target.value });
	};

	return (
		<div className="container mx-auto">
			<div className="row border-bottom">
				<h4 className="my-4">DIRECCIÓN DE ENVIO</h4>
			</div>
			<div className="row">
				<div className="col-xl-6 col-lg-6 col-12">
					<TextField
						className="w-100 mt-4"
						id="input-name"
						name="name"
						label="Nombre"
						onChange={handleChange}
						variant="filled"
						type="text"
						disabled={state.loading}
						error={!state.isName}
						helperText={state.isName ? '' : 'Obligatorio'}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<AccountCircle />
								</InputAdornment>
							),
						}}
					/>
				</div>
				<div className="col-xl-6 col-lg-6 col-12">
					<TextField
						className="w-100 mt-4"
						id="input-last-name"
						name="lastName"
						label="Apellido"
						variant="filled"
						type="text"
						disabled={state.loading}
						onChange={handleChange}
						error={!state.isLastName}
						helperText={state.isLastName ? '' : 'Obligatorio'}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<AccountCircle />
								</InputAdornment>
							),
						}}
					/>
				</div>
			</div>
			<div className="row">
				<div className="col-xl-6 col-lg-6 col-12">
					<TextField
						className="w-100 mt-4"
						id="input-mail"
						name="email"
						label="Correo"
						variant="filled"
						type="text"
						disabled={state.loading}
						onChange={handleChange}
						error={!state.isEmail}
						helperText={state.isEmail ? '' : 'Debe ser un Email Valido'}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<MailOutline />
								</InputAdornment>
							),
						}}
					/>
				</div>
				<div className="col-xl-6 col-lg-6 col-12">
					<TextField
						className="w-100 mt-4"
						id="input-phone"
						name="phone"
						label="Telefono"
						variant="filled"
						type="number"
						error={!state.isPhone}
						helperText={state.isPhone ? '' : 'Obligatorio'}
						onChange={handleChange}
						disabled={state.loading}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<Phone />
								</InputAdornment>
							),
						}}
					/>
				</div>
			</div>

			<div className="row">
				<div className="col-xl-6 col-lg-6 col-12">
					<TextField
						className="w-100 mt-4"
						id="input-code"
						name="code"
						value={state.code}
						label="Código Postal"
						variant="filled"
						onChange={handleCode}
						disabled={state.loading}
						select
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<LocationOn />
								</InputAdornment>
							),
						}}
					>
						<MenuItem key="11000" value="11000">
							11000
						</MenuItem>
						<MenuItem key="89000" value="89000">
							89000
						</MenuItem>
					</TextField>
				</div>
				<div className="col-xl-6 col-lg-6 col-12">
					<TextField
						className="w-100 mt-4"
						id="input-location"
						name="location"
						label="Colonia"
						value={state.location}
						variant="filled"
						onChange={handleLocation}
						select
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<LocationOn />
								</InputAdornment>
							),
						}}
					>
						{state.locations.map((option, index) => (
							<MenuItem key={index} value={option}>
								{option}
							</MenuItem>
						))}
					</TextField>
				</div>
			</div>

			<div className="row">
				<div className="col-xl-6 col-lg-6 col-12">
					<TextField
						className="w-100 mt-4"
						id="input-region"
						name="region"
						label="Estado / Región"
						variant="filled"
						type="text"
						disabled={state.loading}
						onChange={handleChange}
						error={!state.isRegion}
						helperText={state.isRegion ? '' : 'Obligatorio'}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<LocationOn />
								</InputAdornment>
							),
						}}
					/>
				</div>
				<div className="col-xl-6 col-lg-6 col-12">
					<TextField
						className="w-100 mt-4"
						id="input-city"
						name="city"
						label="Ciudad"
						variant="filled"
						type="text"
						disabled={state.loading}
						onChange={handleChange}
						error={!state.isCity}
						helperText={state.isCity ? '' : 'Obligatorio'}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<LocationOn />
								</InputAdornment>
							),
						}}
					/>
				</div>
			</div>
			<div className="row">
				<div className="col-xl-6 col-lg-6 col-12">
					<TextField
						className="w-100 mt-4"
						id="input-neighborhood"
						name="neighborhood"
						label="Delegación o municipio"
						variant="filled"
						type="text"
						disabled={state.loading}
						onChange={handleChange}
						error={!state.isNeighborhood}
						helperText={state.isNeighborhood ? '' : 'Obligatorio'}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<PinDrop />
								</InputAdornment>
							),
						}}
					/>
				</div>
				<div className="col-xl-6 col-lg-6 col-12">
					<TextField
						className="w-100 mt-4"
						id="input-address"
						name="address"
						label="Calle"
						variant="filled"
						onChange={handleChange}
						type="text"
						disabled={state.loading}
						error={!state.isAddress}
						helperText={state.isAddress ? '' : 'Obligatorio'}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<Map />
								</InputAdornment>
							),
						}}
					/>
				</div>
			</div>

			<div className="row mt-4 mx-4">
				<button
					type="button"
					className="btn btn-dark mx-2"
					disabled={state.loading}
				>
					Libreta de direcciones
				</button>
				<button
					type="button"
					className="btn btn-dark mx-2"
					onClick={handleClick}
					disabled={state.loading}
				>
					Guardar
				</button>
			</div>
			<div className="row mt-4 mx-4">
				<FormControlLabel
					control={
						<Checkbox
							checked={state.check}
							onChange={handleCheck}
							name="check"
						/>
					}
					label="Utiliza como dirección de facturación."
				/>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	products: state.products,
});

export default connect(mapStateToProps, null)(FormUser);
