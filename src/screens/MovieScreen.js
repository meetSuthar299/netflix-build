import React, { useEffect, useState } from "react";
import "./MovieScreen.css";
import Nav from "../Nav";
import { useSearchParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectuser } from '../features/userSlice';
import { loadStripe } from "@stripe/stripe-js";
import ReactPlayer from 'react-player/lazy';
import axios from "../axios";




function MovieScreen() {
    const [searchParams] = useSearchParams();
    const movieId = searchParams.get("movieId");
    const movieName = searchParams.get("movieName");

    const fetchUrl = `/movie/${movieId}/videos?api_key=49a801f5d312edfe6ce11941fbbbecc2`;
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(fetchUrl);
            setVideos(response?.data.results);
        }
        fetchData();
    }, [fetchUrl]);

    return (

        <div className="movieScreen">
            <Nav />
            <h1 className="movieTitle">{movieName}</h1>
            {videos?.map((video) => (
                <div>
                    <ReactPlayer
                        key={video.id}
                        url={`https://www.youtube.com/watch?v=${video.key}`}
                        controls="true"
                    />
                </div>

            ))}
        </div>
    );
}

export default MovieScreen;