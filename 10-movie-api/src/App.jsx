import { useEffect, useState } from "react";

const fetchPopularMovies = async () => {
  const accessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error(
      "TMDB access token is missing. Add VITE_TMDB_ACCESS_TOKEN to your .env.local file."
    );
  }

  const res = await fetch(
    "https://api.themoviedb.org/3/movie/popular",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        accept: "application/json",
      },
    }
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      errorData.status_message ||
        `TMDB request failed (${res.status} ${res.statusText}).`
    );
  }

  const data = await res.json();
  if (!Array.isArray(data.results)) {
    throw new Error("TMDB returned an unexpected response.");
  }
  return data.results;
};

const App = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    fetchPopularMovies()
      .then((movies) => {
        if (active) {
          setList(movies);
        }
      })
      .catch((error) => {
      console.error("Error fetching popular movies:", error);
        if (active) {
          setError(
            error instanceof Error
              ? error.message
              : "An unexpected error occurred while fetching movies."
          );
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">
        Popular Movies
      </h2>

      {loading ? (
        <h4 className="text-center">Loading movies...</h4>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          Could not load movies: {error}
        </div>
      ) : list.length === 0 ? (
        <p className="text-center">No movies were returned.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Sr. No.</th>
                <th>Movie Poster</th>
                <th>Movie Name</th>
                <th>Rating</th>
                <th>Release Date</th>
              </tr>
            </thead>

            <tbody>
              {list.map((movie, index) => {
                return (
                  <tr key={movie.id}>
                    <td>{index + 1}</td>

                    <td>
                      {movie.poster_path ? (
                        <img
                          src={
                            "https://image.tmdb.org/t/p/w500" +
                            movie.poster_path
                          }
                          alt={movie.title}
                          style={{
                            width: "100px",
                            height: "150px",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        "Poster not available"
                      )}
                    </td>

                    <td>{movie.title}</td>

                    <td>
                      {movie.vote_average.toFixed(1)} 
                    </td>

                    <td>
                      {movie.release_date || "N/A"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default App;
