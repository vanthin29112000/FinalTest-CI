import axios from "axios";

const baseURL = "https://api.shrtco.de/v2/";

const fetchAPIShortLink = {
   shortLink: (url) => {
      return axios.get(`${baseURL}shorten?url=${url}/very/long/link.html`);
   },
};

export default fetchAPIShortLink;
