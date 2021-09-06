export default function fetchImages(query, page) {
  const KEY = "22456437-7bc40aa948e36a9aa215a1147";
  const URL = `https://pixabay.com/api/?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  return fetch(URL).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error("Something gone wrong"));
  });
}
