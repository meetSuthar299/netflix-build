import React, { useEffect, useState } from "react";
import "./MovieScreen.css";
import Nav from "../screensComponents/Nav";
import { useSearchParams } from "react-router-dom";
import axios from "../axios";
import YouTube from "react-youtube";


function MovieScreen() {
    const [searchParams] = useSearchParams();
    const movieId = searchParams.get("movieId");
    const movieName = searchParams.get("movieName");
    const [selectedType, setSelectedType] = useState('Trailer');
    const fetchUrl = `/movie/${movieId}/videos?api_key=49a801f5d312edfe6ce11941fbbbecc2`;
    const [videos, setVideos] = useState([]);
    const [loadedVideos, setLoadedVideos] = useState([]); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(fetchUrl);
                const videoData = response?.data?.results;
                setVideos(videoData);

                // Load only video thumbnails initially
                setLoadedVideos(videoData.map(video => {
                    return {
                        ...video,
                        loaded: false,
                        thumbnailUrl: `https://img.youtube.com/vi/${video.key}/0.jpg`,
                    };
                }));
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [fetchUrl]);

    const loadVideo = (video) => {
        // Load a video when it's clicked
        if (!video.loaded) {
            video.loaded = true;
            setLoadedVideos([...loadedVideos]);
        }
    };

    const handleChange = (event) => {
        setSelectedType(event.target.value);
    };

    const filterVideosByType = (videos, selectedType) => {
        if (selectedType === 'All') {
            return videos;
        } else {
            return videos?.filter(video => video?.type === selectedType);
        }
    };

    const filteredVideos = filterVideosByType(loadedVideos, selectedType);

    return (
        <div className="movieScreen">
            <Nav />
            <div className="movieScreenContainer">
                <div className="movieScreenMovieInfo">
                    <div
                        className="movieScreenMovieBanner"
                        style={{
                            backgroundImage: `url("https://image.tmdb.org/t/p/original/${searchParams?.get("movieBackground")}")`,
                        }}
                    ></div>
                    <div className="movieScreenMovieContent">
                        <h1 className="movieScreenMovieBannerTitle">{movieName}</h1>
                        <p className="movieScreenMovieBannerDescription">
                            {searchParams?.get("movieOverview")}
                        </p>
                        <h4>Release Date:</h4>
                        <p>{searchParams?.get("movieReleaseDate")}</p>
                    </div>
                </div>
                <div className="movieScreenMovieDropdown">
                    <label id="movieSelect">
                        <select value={selectedType} onChange={handleChange}>
                            <option value="All">All</option>
                            {[...new Set(videos?.map(v => v.type))].map((type, index) => (
                                <option key={index} value={type}>{type}s</option>
                            ))}
                        </select>
                    </label>
                </div>
                <div className="movieScreenMovieList">
                    {filteredVideos.map((video) => (
                        <div key={video?.id} className="movieScreenMovie" onClick={() => loadVideo(video)}>
                            <h3 className="movieScreenMovieType">{video?.name}</h3>
                            {video.loaded ? (
                                <YouTube
                                    videoId={video?.key}
                                    opts={{ playerVars: { controls: 1 } }}
                                />
                            ) : (
                                <img src={video.thumbnailUrl} alt="Video Thumbnail" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MovieScreen;