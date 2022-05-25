import React from "react";
import { Link } from "react-router-dom";
import { HISTORY_PATH, HOME_PATH } from "../../common/routerConstants";
import { useLocation } from "react-router";

const Header = () => {
	const location = useLocation();

	return (
		<div className={`header ${location.pathname.includes('gallery') ? 'sticky' : ''}`}>
			<nav className="menu">
				<ul className="nav-list">
					<li className={`nav-item ${location.pathname === HOME_PATH ? 'active' : ''}`}>
						<Link to={HOME_PATH}>Home</Link>
					</li>
					<li className={`nav-item ${location.pathname === HISTORY_PATH ? 'active' : ''}`}>
						<Link to={HISTORY_PATH}>History</Link>
					</li>
				</ul>
			</nav>
		</div>
	)
}

export default Header
