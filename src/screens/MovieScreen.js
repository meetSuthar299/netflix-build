import React, { useEffect, useState } from "react";
import "./MovieScreen.css";
import Nav from "../screensComponents/Nav";
import { useSearchParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectuser } from '../features/userSlice';
import { loadStripe } from "@stripe/stripe-js";
import ReactPlayer from 'react-player/lazy';
import axios from "../axios";
import Banner from "../screensComponents/Banner";

function MovieScreen() {
    const [searchParams] = useSearchParams();
    const movieId = searchParams.get("movieId");
    const movieName = searchParams.get("movieName");
    const [selectedType, setSelectedType] = useState('All');

    const fetchUrl = `/movie/${movieId}/videos?api_key=49a801f5d312edfe6ce11941fbbbecc2`;
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(fetchUrl);
            setVideos(response?.data.results);
        };
        fetchData();
    }, [fetchUrl]);

    const handleChange = (event) => {
        setSelectedType(event.target.value);
    };

    const filteredVideos = selectedType === 'All' ? videos : videos.filter(video => video.type === selectedType);

    return (
        <div className="movieScreen">
            <Nav />
            {/* <Banner/> */}

            <div
                className="banner"
                style={{
                    backgroundSize: "cover",
                    backgroundImage: `url("https://image.tmdb.org/t/p/original/${searchParams.get("movieBackground")}")`,
                    backgroundPosition: "center center",
                }}
            >
                <div className="bannerContents">
                    <h1 className="bannerTitle">{movieName}</h1>
                    <h1 className="bannerDiscription">
                        {searchParams.get("movieOverview")}
                    </h1>
                    <br/>
                    <br/>
                    <h4>Release Date:</h4>
                    <p>{searchParams.get("movieReleaseDate")}</p>
                </div>
                <div className="bannerFadeBottom" />
            </div>

            <div className="movieScreenmovieInfo">

            </div>
            <br />
            <select value={selectedType} onChange={handleChange}>
                <option value="All">All</option>
                {[...new Set(videos.map(v => v.type))].map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                ))}
            </select>
            {filteredVideos.map((video) => (
                <div key={video.id} className="movieScreenmovie">
                    <h3 className="movieScreenmovieType">{video.name}</h3>
                    <ReactPlayer
                        className="movieScreenmoviePlayer"
                        url={`https://www.youtube.com/watch?v=${video.key}`}
                        controls={true}
                    />
                </div>
            ))}
        </div>
    );
}

export default MovieScreen;