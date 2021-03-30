import "./App.css";

import {
  Link,
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";

// import Profile from "./pages/Profile";
import Timeline from "./pages/Timeline";
import Interview from "./pages/Interview";
import Button from "@material-ui/core/Button";
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Container,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

function App() {
  const [drawerStatus, setdrawerStatus] = useState(false);

  return (
    <Router>
      <div>
        <AppBar position="static">
          <Toolbar>
            {/* <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => {
                setdrawerStatus(true);
              }}
            >
              <MenuIcon />
            </IconButton> */}
            <Typography
              variant="h6"
              style={{
                flexGrow: 1,
              }}
            >
              Career Booster
            </Typography>
            {/* <Button color="inherit">Login</Button> */}
          </Toolbar>
        </AppBar>
        <SwipeableDrawer
          anchor="left"
          open={drawerStatus}
          onClose={() => {
            setdrawerStatus(false);
          }}
          onOpen={() => {
            setdrawerStatus(true);
          }}
        >
          <div
            role="presentation"
            onClick={() => {
              setdrawerStatus(true);
            }}
            onKeyDown={() => {
              setdrawerStatus(true);
            }}
          >
            <List>
              <Link to="/timeline">
                <ListItem button key={"timeline"}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Timeline"} />
                </ListItem>
              </Link>
              <Link to="/profile">
                <ListItem button key={"Profile"}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Profile"} />
                </ListItem>
              </Link>
              <Link to="/interview">
                <ListItem button key={"interview"}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Interview"} />
                </ListItem>
              </Link>
            </List>
          </div>
        </SwipeableDrawer>

        <Container>
          <Switch>
            {/* <Route path="/interview">
							<Interview />
						</Route>
						<Route path="/profile">
							<Profile />
						</Route> */}

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
  );
}

export default App;
