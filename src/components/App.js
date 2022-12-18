import { Component } from "react";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { SearchForm } from "./SearchForm/SearchForm";
import { Button } from 'components/Button/Button';
import { Modal } from '../components/Modal/Modal';
import { getPicturesByApi } from '../service/getPicturesByApi';
import { Notify } from "notiflix";
import { Spinner } from "./Spinner/Spinner";

export class App extends Component {
  state = {
    searchQuery: '',
    pictures: [],
    page: 1,
    loading: false,
    error: null,
    selectedPicture: null,
    showLoadMore: false
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery, pictures: [], page: 1 });
  };

  componentDidUpdate = (_, prevState) => {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ loading: true });

      getPicturesByApi(searchQuery, page)
        .then(pictures => {
          if (pictures.data.hits.length === 0)
            Notify.warning('Please enter valid search query');
          
          if (pictures.data.totalHits > 12 && page < Math.ceil(pictures.data.totalHits / 12)) this.setState({ showLoadMore: true })
          else { this.setState({ showLoadMore: false }) }

          if (prevState.searchQuery !== searchQuery) this.setState({ pictures: [...pictures.data.hits] })
          else this.setState({ pictures: [...prevState.pictures, ...pictures.data.hits] });
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({loading: false}));
    }
  };

  handleButtonClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onSelectPicture = pictureUrl => {
    this.setState({ selectedPicture: pictureUrl });
  };

  closeModal = () => {
    this.setState({ selectedPicture: null });
  };

  render() {
    const { pictures, error, loading, selectedPicture, showLoadMore } = this.state;

    return (
      <>
        <SearchForm onSubmit={this.handleFormSubmit} />
        {error && <h1>Oops, {error.message}. Please reload the page</h1>}
        {loading && <Spinner/>}
        <ImageGallery pictures={pictures} onSelectPicture={this.onSelectPicture} />
        {showLoadMore && <Button onLoadMore={this.handleButtonClick} />}
        {selectedPicture && <Modal src={selectedPicture} closeModal={this.closeModal}/>}
      </>
    );
  }
};