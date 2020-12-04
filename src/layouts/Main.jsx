import React from 'react';
import Footer from './Footer';

const Layout = (props) => {
	return (
		<>
			<main className="d-flex justify-content-center container">{props.children}</main>
			<Footer />
		</>
	);
};

export default Layout;
