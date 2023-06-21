import { Searchbar } from 'components/Searchbar/Searchbar';
import { AppWrapper } from './App.styled';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { LoadMoreButton } from 'components/LoadMoreButton/LoadMoreButton';
import { useState, useEffect } from 'react';
import { getImages } from 'API/getImages';
import { Loader } from 'components/Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState('idle');

  const notification = (message = 'Something went wrong...') =>
    toast.error(message, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });

  useEffect(() => {
    (async () => {
      if (!searchQuery) {
        return;
      }

      try {
        let currentStatus = 'pending';
        setStatus(currentStatus);
        const newImages = await getImages(searchQuery, page);

        switch (newImages.length) {
          case 0:
            notification(`There are no results for "${searchQuery}" request.`);
            currentStatus = 'rejected';
            break;
          case 12:
            currentStatus = 'resolved';
            break;
          default:
            currentStatus = 'idle';
            break;
        }

        setImages(prevImages => [...prevImages, ...newImages]);
        setStatus(currentStatus);
      } catch (error) {
        console.log(error.message);
        notification();
        setStatus('rejected');
      }
    })();
  }, [page, searchQuery]);

  const handleFormSubmit = currentQuery => {
    if (currentQuery === searchQuery) {
      notification(`You are already looking at "${currentQuery}"`);
      return;
    }

    setSearchQuery(currentQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    //Чи можна так? Це простіший і скорочений варіант і робить те саме.
    setPage(page + 1);
    // setPage(prevPage => prevPage + 1);
  };

  return (
    <AppWrapper>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery images={images} />
      {status === 'pending' && <Loader />}
      {status === 'resolved' && <LoadMoreButton onClick={handleLoadMore} />}
      <ToastContainer />
    </AppWrapper>
  );
};