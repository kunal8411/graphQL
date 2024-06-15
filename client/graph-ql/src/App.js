import logo from "./logo.svg";
import "./App.css";
import { gql, useQuery } from "@apollo/client";
const GET_ALL_USERS = gql`
  query getAllUsers {
    getAllUsers {
      email
    }
  }
`;
function App() {
  const { loading, data, error } = useQuery(GET_ALL_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="App">
      <h1>Learning GraphQL</h1>
      <ul>
        {data.getAllUsers.map((user, index) => (
          <li key={index}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
