import { useState } from 'react';
import PropTypes from 'prop-types';

import style from './searchbar.module.css';

const Searchbar = ({onSubmit}) => {
  const [search, setSearch] =useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(search);
    setSearch('');
  };

  const handleChange = ({ target }) => {
    const {value } = target;
    setSearch(value);
  };

 
    return (
      <header className={style.searchbar}>
        <form className={style.form} onSubmit={handleSubmit}>
          <button type="submit" className={style.button}>
            <span className={style.buttonLabel}>Search</span>
          </button>

          <input
            className={style.input}
            onChange={handleChange}
            value={search}
            name="search"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
