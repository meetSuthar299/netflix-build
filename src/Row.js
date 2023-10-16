import React, { useEffect, useState } from "react";
import "./Row.css"
import axios from "./axios";

function Row({ title, fetchUrl, islargRow = false }) {
    const [movies, setMovies] = useState();

    const baseURL = "https://image.tmdb.org/t/p/original/";
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    return <div className="row">
        <h2>{title}</h2>
        <div className="rowPosters">
        {movies.map(
                (movie) =>
                (
                    (islargRow && movie.poster_path) || (!islargRow && movie.backdrop_path)
                )
                &&
                (
                    <img
                        className={`rowPoster ${islargRow && "rowPosterLarge"}`}
                        key={movie.id}
                        src={`${baseURL}${islargRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name}
                    />
                )
            )}
        </div>
    </div>
}

export default Row;