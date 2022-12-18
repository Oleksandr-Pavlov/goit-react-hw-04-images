import { useState, useEffect } from "react";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { SearchForm } from "./SearchForm/SearchForm";
import { Button } from 'components/Button/Button';
import { Modal } from '../components/Modal/Modal';
import { getPicturesByApi } from '../service/getPicturesByApi';
import { Notify } from "notiflix";
import { Spinner } from "./Spinner/Spinner";

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [pictures, setPictures] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedPicture, setSelectedPicture] = useState(null)
  const [showLoadMore, setShowLoadMore] = useState(false)

  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery)
    setPictures([])
    setPage(1)
  };

  useEffect(() => {
    if (!searchQuery) return;

    setLoading(true)

    getPicturesByApi(searchQuery, page)
      .then(pictures => {
        if (pictures.data.hits.length === 0) Notify.warning('Please enter valid search query');

        if (pictures.data.totalHits > 12 && page < Math.ceil(pictures.data.totalHits / 12)) setShowLoadMore(true);
        else {
          Notify.info("We're sorry, but you've reached the end of search results.");
          setShowLoadMore(false)
        };

        page === 1 && Notify.success(`Hooray, we found ${pictures.data.totalHits} pictures that matches query "${searchQuery}"`);
        setPictures(prevPictures => [...prevPictures, ...pictures.data.hits]);
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, [page, searchQuery])
  

  const loadMore = () => setPage(page => page + 1)

  const onSelectPicture = pictureUrl => setSelectedPicture(pictureUrl)

  const closeModal = () => setSelectedPicture(null)

    return (
      <>
        <SearchForm onSubmit={handleFormSubmit} />
        {error && <h1>Oops, {error.message}. Please reload the page</h1>}
        {loading && <Spinner/>}
        <ImageGallery pictures={pictures} onSelectPicture={onSelectPicture} />
        {showLoadMore && <Button onLoadMore={loadMore} />}
        {selectedPicture && <Modal src={selectedPicture} closeModal={closeModal}/>}
      </>
    );
}


