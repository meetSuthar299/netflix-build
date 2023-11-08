import React, { useEffect, useState } from "react";
import "./Nav.css"
import { useNavigate } from "react-router-dom";
import { FaHeart, FaTrash } from 'react-icons/fa';
import { collection, getDocs, deleteDoc, query, where } from 'firebase/firestore/lite';
import db from '../firebase';
import { useSelector } from 'react-redux';
import { selectuser } from '../features/userSlice';

function Nav() {
    const [show, handleShow] = useState(false);
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const user = useSelector(selectuser);
    const [showMovies, setShowMovies] = useState(false);

    const transitionNavBar = () => {
        if (window.scrollY > 100) {
            handleShow(true);
        } else {
            handleShow(false);
        }
    }

    useEffect(
        () => {
            window.addEventListener("scroll", transitionNavBar);
            return () => window.removeEventListener("scroll", transitionNavBar);
        },
        []
    );

    useEffect(() => {
        // Check if user and user.id are defined
        if (user && user.uid) {
            getDocs(collection(db, "customers", user.uid, "likes")).then((snap) => {
                //Set movies to an array of movie objects
                setMovies(snap.docs.map((doc) => doc.data()));
            });
        }
    }, [movies, user, user.uid]);

    // Handle the user's selection
    const handleHeartClick = () => {
        setShowMovies(!showMovies);
    };

    const removeMovie = async (movieId) => {
        const movieRef = await getDocs(
            query(
                collection(db, "customers", user.uid, "likes"),
                where("movie_id", "==", movieId)
            )
        );
        movieRef.forEach(async (doc) => {
            await deleteDoc(doc.ref);
            //console.log(doc.data());
        });
    }

    return (
        <div className={`nav ${show && 'navBlack'}`} >
            <div className="navContents">
                <img
                    onClick={() => { navigate('/') }}
                    className="navLogo"
                    src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
                    alt="Netflix"
                />

                <div className="movie-container">
                    <div className="heart-icon" onClick={handleHeartClick}>
                        <FaHeart />
                        <p className="movie-count">{movies.length}</p>
                    </div>

                    {showMovies && (
                        <div className="movie-list">
                            {movies.length > 0 ? (
                                <div>
                                    <h3>Liked Movies:</h3>
                                    <br />
                                    {movies.map((movie) => (
                                        <div key={movie.movie_id} className="movie-item">
                                            <p className="movie-name">{movie.movie_name}</p>
                                            <FaTrash
                                                className="garbage-icon"
                                                onClick={() => { removeMovie(movie.movie_id) }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="no-movies">No movies found</p>
                            )}
                        </div>
                    )}
                </div>
                <img
                    onClick={() => { navigate("/profile") }}
                    className="navAvatar"
                    src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                    alt="Profile"
                />
            </div>
        </div>
    )
}

export default Nav;