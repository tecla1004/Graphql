import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeScreen from "./components/layout/HomeScreen";
import DisplayList from "./components/layout/DisplayList";

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
    element: <DisplayList />,
  },
]);

const App = () => {
  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router}>
        {/* <Title /> */}
        <HomeScreen />
        <DisplayList />
        {/* <People />
        <AddCar/> */}
      </RouterProvider>
    </ApolloProvider>
  );
};

export default App;
