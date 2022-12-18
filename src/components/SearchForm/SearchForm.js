import { Notify } from 'notiflix';
import css from './SearchForm.module.css';

export const SearchForm = ({onSubmit}) => {
  const handleSubmit = e => {
    e.preventDefault()

    if (e.currentTarget[1].value.trim() === '') return Notify.failure('Enter some query please');

    onSubmit(e.currentTarget[1].value);
    e.currentTarget[1].value = '';
  };

    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            name="searchQuery"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
