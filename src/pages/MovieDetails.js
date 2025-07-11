import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export const MovieDetails = ()=>{

  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

  useEffect(() => {

    const fetchMovie = async () => {

      try {
        const res = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`);
        if (res.data.Response === 'True') {
          setMovie(res.data);
        }
      } catch (err) {
        console.error("Error fetching movie details:", err);
      }
    };

    fetchMovie();

  }, [API_KEY, id]);

  if (!movie) return <p>Loading movie details...</p>;

  return (

    <div className='movieBody'>

      
      <div className="row ">

        <div className="col-md-4">

          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"}
            alt={movie.Title}
            className="img-fluid rounded shadow"
          />

        </div>

        <div className="col-md-8" style={{color : 'white'}}>

          <h2>{movie.Title} ({movie.Year})</h2>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p><strong>IMDb Rating:</strong> {movie.imdbRating}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
          
        </div>
      </div>
        <Link to="/" className="btn btn-secondary mb-3 float-end"> --Back to Home</Link>


    </div>
  );
}

