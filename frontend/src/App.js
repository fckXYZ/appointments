import './App.scss';
import { Route, Switch } from "react-router";

import Header from "./components/Header";
import Home from "./containers/Home";
import History from "./containers/History";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { GALLERY_PATH, HISTORY_PATH, HOME_PATH } from "./common/routerConstants";
import Gallery from "./containers/gallery";

function App() {
	return (
		<div className="App">
			<Header/>
			<div className="main-content-block">
				<Switch>
					<Route exact path={HISTORY_PATH} component={History}/>
					<Route path={GALLERY_PATH} component={Gallery}/>
					<Route path={HOME_PATH} component={Home}/>
				</Switch>
			</div>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</div>
	);
}

export default App;
