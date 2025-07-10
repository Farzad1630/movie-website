import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { Link } from 'react-router-dom';

export const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

  const fetchMovies = async (term = 'batman') => {
    setLoading(true);
    try {
      const res = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${term}`);
      if (res.data.Response === 'True') {
        setMovies(res.data.Search);
      } else {
        setMovies([]);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [API_KEY]);

  return (
    <div>
      <div className="mb-4">
        <input type="text" placeholder="Search for a movie..." className="form-control" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              fetchMovies(searchTerm);
            }
          }}
        />
      </div>

      <h2 className="mb-4">Movies related to search </h2>

      {loading ? (
        <h3>Loading...</h3>
      ) : movies.length === 0 ? (
        <h3>No movies found.</h3>
      ) : (
        <div className="row">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="col-md-3 mb-4">
              <div className="card h-100 shadow-lg">
                <img
                  src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"}
                  className="card-img-top"
                  alt={movie.Title}
                />
                <div className="card-body">
                  <h5 className="card-title">{movie.Title}</h5>
                  <p className="card-text">{movie.Year}</p>
                  <Link to={`/movie/${movie.imdbID}`} className="btn btn-secondary btn-sm">Details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
