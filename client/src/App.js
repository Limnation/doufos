import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";




import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Route } from "react-router-dom";
//import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Importing components
import Footer from "./components/Footer";
import Navbot from "./components/Navbot";
import Navtop from "./components/Navtop";
import Header from "./components/Header";
// Importing Pages
import Info from "./pages/Info";
import Map from "./pages/Map";
import Joinus from "./pages/Joinus";
import Signin from "./pages/Signin";
import Form from "./pages/Form";
// Importing a CSS file
import "./css/landing.css";
import "./css/pages.css";
// Importing Objects
import { headerbackground } from "./components/Objects";



// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <style scoped>{headerbackground}</style>
          <div className="backimage background">
            <Header />
            <Navtop />
            <Route exact path="/">
              <div className="homepage"></div>
            </Route>
            <Route exact path="/joinus">
              <Joinus />
            </Route>
            <Route exact path="/signin">
              <Signin />
            </Route>
            <Route exact path="/form">
              <Form />
            </Route>
            <Route exact path="/info">
              <Info />
            </Route>
            <Route exact path="/map">
              <Map />
            </Route>
            <Route exact path="/add-sighting">
              <Form />
            </Route>
            
            <Navbot />
            <Footer />
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}
