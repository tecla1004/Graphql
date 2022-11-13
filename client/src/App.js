import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import DetailScreen from "./components/screens/DetailScreen";
import HomeScreen from "./components/screens/HomeScreen";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeScreen />,
  },
  {
    path: "/details/:id",
    element: <DetailScreen />,
  },
]);

const App = () => {
  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router}>
        <HomeScreen />
        <DetailScreen />
      </RouterProvider>
    </ApolloProvider>
  );
};

export default App;
