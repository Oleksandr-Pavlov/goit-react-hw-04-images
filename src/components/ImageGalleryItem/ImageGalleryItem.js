import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ picture: { webformatURL, largeImageURL }, onSelectPicture }) => {
return (
  <img
    className={css.ImageGalleryItemImage}
    src={webformatURL}
    alt="Some text"
    onClick={() => {
      onSelectPicture(largeImageURL);
    }}
  />
);
}