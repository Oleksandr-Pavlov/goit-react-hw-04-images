import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import styles from '../ImageGalleryItem/ImageGalleryItem.module.css';

export const ImageGallery = ({ pictures, onSelectPicture }) => {
  return (
    <>
      {pictures.length > 0 && <ul className={css.ImageGallery}>
          {pictures.map(picture => {
            return (
              <li key={picture.id} className={styles.ImageGalleryItem}>
                <ImageGalleryItem
                  picture={picture}
                  onSelectPicture={onSelectPicture}
                />
              </li>
            );
          })}
        </ul>
      }
    </>
  );
}; 