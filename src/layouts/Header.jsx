import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = (props) => {
	return (
		<header className="">
			<Link to={'/buy'} className="btn"></Link>
		</header>
	);
};

const mapStateToProps = (state) => {
	return {
		product: state.product,
	};
};

export default connect(mapStateToProps, null)(Header);
