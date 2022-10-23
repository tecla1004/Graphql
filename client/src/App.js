import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import Details from "./components/screens/Details";
import Home from "./components/screens/Home";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/details/:id",
    element: <Details />,
  },
]);

const App = () => {
  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router}>
        <Home />
        <Details />
      </RouterProvider>
    </ApolloProvider>
  );
};

export default App;
