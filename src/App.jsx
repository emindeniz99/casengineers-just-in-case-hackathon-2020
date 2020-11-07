import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"

import {
	Link,
	Redirect,
	Route,
	BrowserRouter as Router,
	Switch,
} from "react-router-dom"

import Profile from "./pages/Profile"
import Timeline from "./pages/Timeline"

function App() {
	return (
		<Router>
			<div>
				<nav>
					<ul>
						<li>
							<Link to="/timeline">Timeline</Link>
						</li>
						<li>
							<Link to="/profile">Profile</Link>
						</li>
					</ul>
				</nav>

				{/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}
				<Switch>
					<Route path="/profile">
						<Profile />
					</Route>

					<Route path="/timeline">
						<Timeline />
					</Route>
					<Route path="/">
						<Redirect to="/timeline" />
					</Route>
				</Switch>
			</div>
		</Router>
	)
}

export default App
