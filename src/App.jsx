import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"

import { Container, Nav, Navbar } from "react-bootstrap"
import {
	Link,
	Redirect,
	Route,
	BrowserRouter as Router,
	Switch,
} from "react-router-dom"

import Profile from "./pages/Profile"
import Timeline from "./pages/Timeline"
import Interview from "./pages/Interview"

function App() {
	return (
		<Router>
			<div>
				<Navbar bg="light" expand="lg">
					<Navbar.Brand as={Link} to="/">
						Casengineers
					</Navbar.Brand>
					<Nav.Link as={Link} to="/timeline">
						Timeline
					</Nav.Link>

					<Nav.Link as={Link} to="/profile">
						Profile
					</Nav.Link>

					<Nav.Link as={Link} to="/interview">
						Interview
					</Nav.Link>
				</Navbar>

				<Container>
					<Switch>
						<Route path="/interview">
							<Interview />
						</Route>
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
				</Container>
			</div>
		</Router>
	)
}

export default App
