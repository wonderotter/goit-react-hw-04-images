import PropTypes from 'prop-types';
import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { toast } from 'react-toastify';

import { Bar, Form, FormButton, FormInput } from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = event => {
    setQuery(event.currentTarget.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (query.trim() === '') {
      toast.error('Please enter search query', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      return;
    }
    onSubmit(query);
  };

  return (
    <Bar>
      <Form onSubmit={handleSubmit}>
        <FormButton type="submit">
          <BsSearch size="100%" />
        </FormButton>
        <FormInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleInputChange}
        />
      </Form>
    </Bar>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};