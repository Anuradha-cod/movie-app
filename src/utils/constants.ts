import axios from "axios"
const CONSTANTS = {
  BASE_URL: "https://www.omdbapi.com/",
  API_USER_ID: "tt3896198",
  API_KEY: "a3f5f2d2",
};
// http://www.omdbapi.com/?i=tt3896198&apikey=a3f5f2d2
export default CONSTANTS;

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOTUyYWQ1MjA4Y2QxODU0ZmM5YjJjNTMxMTQ5Zjk3MCIsInN1YiI6IjY1MzhlMzJlMGZiMTdmMDExYjEzZjg2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dDKgnCEmCIIaA8S-Kiw7tazmn_XXBuTGW_fEYGijyLE";

const headers = {
    Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async () => {
    try {
        const { data } = await axios.get("https://api.themoviedb.org/3/discover/movie", {
            headers,
            params:{
              api_key:"a952ad5208cd1854fc9b2c531149f970"
            }
        });
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
};
