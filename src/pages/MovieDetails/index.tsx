import { ReactElement, useEffect, useState } from "react";
import styles from "./index.module.css";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import service from "utils/service";
import CONSTANTS from "utils/constants";
import { Button, Grid } from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import Divider from "@material-ui/core/Divider";
import Skeleton from "./Skeleton";
import axios from "axios";
import YouTube from 'react-youtube';

const MovieDetails = (): ReactElement => {
  const [trailerAvailable, setTrailerAvailable] = useState(false);
  const [videoId, setvideoId] = useState("");

  const { movieId } = useParams<{ movieId: string }>();
  const { isSuccess, isLoading, error, data } = useQuery(
    [`movie`, movieId],
    () => service.get(CONSTANTS.BASE_URL, { i: movieId, plot: "full" }),
    {
      enabled: !!movieId,
    }
  );
  const toggleVideo = () => {
    setTrailerAvailable((prevState) => (!prevState));
  }
  console.log("data",videoId);
  // const videoId = data.split('v=')[1];
  const fetchMovieTrailer = async () => {

    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?i=${movieId}&apikey=a3f5f2d2`
      );
      const youtubeResponse = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?key=AIzaSyC5S1eD5Coaks3f8e9mH7LRUnGjx_F7fog&q=${response.data.Title} official trailer`
      );
      console.log("youtubeResponse",youtubeResponse);
      if (youtubeResponse.data.items.length > 0) {
        const video = youtubeResponse.data.items[0].id.videoId;
        setvideoId(video)
        console.log("videoId",videoId);
        
      }
    
    } catch (error) {
      console.error('Error fetching trailer:', error);
    }
  }
  useEffect(()=>{
    if (movieId) {
      
      fetchMovieTrailer()
    }
  },[movieId])
  const opts = {
    height: '390',
    width: '640',
    position:"relative !important" ,
    zIndex:"99 !important"
  };
  return (
    <div className={styles.root}>
      {/* Loading state */}
      {isLoading && <Skeleton />}

      {/* Success state */}
      {isSuccess && (
        <Grid container justify="center">
          <Grid item xs={12} sm={10}>
            <Grid container>
              <Grid item xs={12} sm={4}>
                {trailerAvailable &&
                <>
                
              {videoId  ? (
                <YouTube style={{position:"absolute",zIndex:99, top:"15%",left:"45%" }} videoId={videoId} opts={opts} />
                ) : (
                  <p>No trailer available</p>
                  )}
                  </>}
                <img
                  src={data.Poster}
                  alt={data.Title}
                  height="600"
                  width="100%"
                />
              </Grid>
              <Grid item xs={12} sm={8} className={styles.detailsSection}>
                <div className={styles.titleContainer}>
                  <div className={styles.title}>{data.Title}</div>
                  <div className={styles.ratingsRoot}>
                    <StarIcon fontSize="large" htmlColor="#e4bb24" />
                    <div>
                      <div className={styles.ratingsContainer}>
                        {data.imdbRating}
                        <i>/10</i>
                      </div>
                      <div className={styles.votes}>{data.imdbVotes}</div>
                    </div>
                  </div>
                </div>

                <div className={styles.subInfo}>
                  <div>{data.Year}</div>
                  <div>{data.Rated}</div>
                  <div>{data.Released}</div>
                  <div>{data.Runtime}</div>
                </div>

                <div className={styles.plot}>{data.Plot}</div>

                <Divider light={false} />

                <Grid container className={styles.metaData}>
                  <Grid item xs={3} md={2} className={styles.metaLabel}>
                    Genre :
                  </Grid>
                  <Grid item xs={9} md={10} className={styles.metaValue}>
                    {data.Genre}
                  </Grid>
                </Grid>
                <Grid container className={styles.metaData}>
                  <Grid item xs={3} md={2} className={styles.metaLabel}>
                    Director :
                  </Grid>
                  <Grid item xs={9} md={10} className={styles.metaValue}>
                    {data.Director}
                  </Grid>
                </Grid>
                <Grid container className={styles.metaData}>
                  <Grid item xs={3} md={2} className={styles.metaLabel}>
                    Writer :
                  </Grid>
                  <Grid item xs={9} md={10} className={styles.metaValue}>
                    {data.Writer}
                  </Grid>
                </Grid>
                <Grid container className={styles.metaData}>
                  <Grid item xs={3} md={2} className={styles.metaLabel}>
                    Actors :
                  </Grid>
                  <Grid item xs={9} md={10} className={styles.metaValue}>
                    {data.Actors}
                  </Grid>
                </Grid>
                <Grid container className={styles.metaData}>
                  <Grid item xs={3} md={2} className={styles.metaLabel}>
                    Language :
                  </Grid>
                  <Grid item xs={9} md={10} className={styles.metaValue}>
                    {data.Language}
                  </Grid>
                </Grid>
                <Grid container className={styles.metaData}>
                  <Grid item xs={3} md={2} className={styles.metaLabel}>
                    Country :
                  </Grid>
                  <Grid item xs={9} md={10} className={styles.metaValue}>
                    {data.Country}
                  </Grid>
                </Grid>
                <Grid container className={styles.metaData}>
                  <Grid item xs={3} md={2} className={styles.metaLabel}>
                    Awards :
                  </Grid>
                  <Grid item xs={9} md={10} className={styles.metaValue}>
                    {data.Awards}
                  </Grid>
                </Grid>
                <Grid container className={styles.metaData}>
                  <Grid item xs={3} md={2} className={styles.metaLabel}>
                    Production :
                  </Grid>
                  <Grid item xs={9} md={10} className={styles.metaValue}>
                    {data.Production}
                  </Grid>
                </Grid>
                <button style={{
                  height: "66px",
                  width: "122px",
                  fontSize: "medium",
                  fontWeight: 900,
                  border: "1px solid black",
                }} onClick={toggleVideo}>
          {trailerAvailable ? 'Close Video' : 'Watch Trailer'}
        </button>
              </Grid>
              
            </Grid>
          </Grid>
        </Grid>
      )}

      {/* Error state */}
      {!!error && <div>{JSON.stringify(error)}</div>}
    </div>
  );
};

export default MovieDetails;
