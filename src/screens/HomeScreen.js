import React from "react";
import "./HomeScreen.css";
import Nav from "../screensComponents/Nav";
import Banner from "../screensComponents/Banner"
import Row from "../screensComponents/Row"
import requests from "../Requests";


function HomeScreen() {
    return (
        <div className="homeScreen">
            
            <Nav />
            
            <Banner />
            
            <Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} islargRow/>
            <Row title="Trending Now" fetchUrl={requests.fetchTrending}/>
            <Row title="Top Rated" fetchUrl={requests.fetchTopRated}/>
            <Row title="Action Movies" fetchUrl={requests.fetchActionMovies}/>
            <Row title="Adventure Movies" fetchUrl={requests.fetchAdventureMovies}/>
            <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies}/>
            <Row title="Crime Movies" fetchUrl={requests.fetchCrimeMovies}/>
            <Row title="Drama Movies" fetchUrl={requests.fetchDramaMovies}/>
            <Row title="Family Movies" fetchUrl={requests.fetchFamilyMovies}/>
            <Row title="Fantasy Movies" fetchUrl={requests.fetchFantasyMovies}/>
            <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies}/>
            <Row title="Music Movies" fetchUrl={requests.fetchMusicMovies}/>
            <Row title="Mystery Movies" fetchUrl={requests.fetchMysteryMovies}/>
            <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies}/>
            <Row title="Documentries" fetchUrl={requests.fetchDocumentries}/>
        </div>
    )
}

export default HomeScreen;