import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';
import Notiflix from 'notiflix';

import {
  SearchForm,
  SearchFormInput,
  SearchFormButton,
} from './SearchBar.styled';

export default function SearchBar() {
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    if (searchInput.trim() === '') {
      Notiflix.Notify.warning('Search query should not be empty!');
      return;
    }

    setSearchParams({ query: searchInput });
    setSearchInput('');
  };

  const handleChange = event => {
    setSearchInput(event.target.value);
  };

  return (
    <SearchForm onSubmit={handleSubmit}>
      <SearchFormInput
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search Movies"
        value={searchInput}
        onChange={handleChange}
        name="searchInput"
      />
      <SearchFormButton type="submit">
        <FaSearch />
      </SearchFormButton>
    </SearchForm>
  );
}
