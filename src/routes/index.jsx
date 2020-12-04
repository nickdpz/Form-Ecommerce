import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NotFound from '../views/NotFound';
// import Home from '../views/Home';
// import Episode from '../views/Episode';
// import Location from '../views/Location';
import Main from '../layouts/Main';

const App = (props) => {
	return (
		<BrowserRouter>
			<Main>
				<Switch>
					{/* <Route exact path="/" component={Home} />
					<Route exact path="/episodes/:episodeId" component={Episode} />
					<Route exact path="/locations/:locationId" component={Location} /> */}
					<Route component={NotFound} />
				</Switch>
			</Main>
		</BrowserRouter>
	);
};


export default App;