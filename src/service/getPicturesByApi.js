import axios from 'axios';

const API_KEY = '30800141-5155b96734261143d4ff6b69f';
const BASE_URL = 'https://pixabay.com/api/';
const SETTINGS = 'image_type=photo&orientation=horizontal&safesearch=true';

export async function getPicturesByApi(searchQuery, page) {
  const response = await axios.get(
    `${BASE_URL}?key=${API_KEY}&per_page=12&q=${searchQuery}&page=${page}&${SETTINGS}`
  );
  return response;
}
