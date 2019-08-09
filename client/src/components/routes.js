import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";

import JobNew from "./jobs/new";
import JobIndex from "./jobs/index";
import JobShow from "./jobs/show";
import JobEdit from "./jobs/edit";
import JobDestroy from "./jobs/destroy";

import Register from "./sessions/register";
import Login from "./sessions/login";
import Logout from "./sessions/logout";

function Routes () {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/contact" component={Contact} />

            <Route exact path="/jobs/new" component={JobNew} />
            <Route exact path="/jobs" component={JobIndex} />
            <Route exact path="/jobs/:id" component={JobShow} />
            <Route exact path="/jobs/:id/edit" component={JobEdit} />
            <Route exact path="/jobs/:id/destroy" component={JobDestroy} />

            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} /> 
            <Route exact path="/logout" component={Logout} />            
        </Switch>
    );
}

export default Routes;
