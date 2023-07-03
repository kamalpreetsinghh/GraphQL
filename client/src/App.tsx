import "./App.css";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import {
  CREATE_USER_MUTATION,
  QUERY_ALL_MOVIES,
  QUERY_ALL_USERS,
  QUERY_MOVIE_BY_NAME,
} from "./query";
import { useState } from "react";

type Movie = {
  id: string;
  name: string;
  yearOfPublication: number;
  isInTheaters: boolean;
};

type User = {
  id: string;
  name: string;
  username: string;
  age: number;
  nationality: string;
  friends?: [User] | null;
  favoriteMovies?: [Movie] | null;
};

function App() {
  const [movieSearch, setMovieSearch] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);
  const [nationality, setNationality] = useState("");

  const { loading, error, data, refetch } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);

  const [fetchMovie, { data: movieSearchData, error: movieSearchError }] =
    useLazyQuery(QUERY_MOVIE_BY_NAME);

  const [createUser] = useMutation(CREATE_USER_MUTATION);

  if (error) {
    console.log("Error Movies");
    console.log(error);
  }

  if (loading) {
    return <h1> DATA IS LOADING...</h1>;
  }

  if (movieData) {
    console.log(movieData);
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Age"
          onChange={(e) => {
            setAge(Number(e.target.value));
          }}
        />
        <input
          type="text"
          placeholder="Nationality"
          onChange={(e) => {
            setNationality(e.target.value.toUpperCase());
          }}
        />
        <button
          onClick={() => {
            createUser({
              variables: {
                input: { name, username, age: Number(age), nationality },
              },
            });
            refetch();
          }}
        >
          Create User
        </button>
      </div>
      <div>
        {data &&
          data.users.map((user: User) => <p key={user.name}>{user.name}</p>)}
      </div>
      <div>
        {movieData &&
          movieData.movies.map((movie: Movie) => (
            <p key={movie.id}>{movie.name}</p>
          ))}
      </div>
      <div>
        <input
          type="text"
          placeholder="Movie Name"
          value={movieSearch}
          onChange={(e) => setMovieSearch(e.target.value)}
        />
        <button
          type="button"
          onClick={() =>
            fetchMovie({
              variables: {
                name: movieSearch,
              },
            })
          }
        >
          Fetch
        </button>
        <div>
          {movieSearchData && (
            <div>
              <h1>MovieName: {movieSearchData.movie.name}</h1>
              <h1>
                Year Of Publication: {movieSearchData.movie.yearOfPublication}
              </h1>{" "}
            </div>
          )}
          {movieSearchError && <h1> There was an error fetching the data</h1>}
        </div>
      </div>
    </div>
  );
}

export default App;
