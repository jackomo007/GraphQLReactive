import React from "react";
import ReactDOM from "react-dom";
import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";

import "./styles.css";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql"
});

const CharactersQuery = (props) => {
  return (
    <Query
      query={gql`
        {
          characters {
            results {
              id
              name
              species
            }
          }
        }
      `}
    >
      {props.children}
    </Query>
  );
};

function App() {
  return (
    <div className="App">
      <CharactersQuery>
        {({ loading, error, data }) => {
          if (loading) return <p>Wait...</p>;
          if (error) return <p>error</p>;

          return data.characters.results.map((character) => {
            return <p key={character.id}>{character.name}</p>;
          });
        }}
      </CharactersQuery>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  rootElement
);
