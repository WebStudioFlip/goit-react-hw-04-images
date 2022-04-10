import { useState, useEffect, useCallback } from 'react';
import { searchGallery } from '../../shared/services/gallery';
import ImageGallery from '../ImageGallery';
import Button from '../Button';
import Loader from '../Loader';
import Searchbar from '../Searchbar';
import Modal from '../Modal';
import style from './gallery.module.css';

const PER_PAGE = 12;
const Gallery = () => {
const [data, setData] = useState({ gallery: [], totalPages: 1, error: null, loading : false });
const [search, setSearch] = useState('');
const [page, setPage] = useState(1);
const [modal, setModal] = useState({
  open: false,
  content: null,
});

const fetchGallery = useCallback(
  async () => {
    setData(prevData => {
      return {
        ...prevData,
        loading : true
      }
    })
    try {
      const { hits, totalHits } = await searchGallery(page, search);
      setData(prevState => {
        return {
          gallery: [...prevState.gallery, ...hits],
          totalPages: Math.max(Math.ceil(totalHits / PER_PAGE), 1),
          error: null,
          loading: false
        };
      });   
    } catch (error) {
      setData(prevState => {
        return {
          ...prevState,
          error: error.message,
          loading : false
        };
      });    
    }
  }, [page, search]
) 

const changeSearch = (search ) => {
  setSearch(search);
  setPage(1);
  setData({ gallery: [], totalPages: 1, error: null });
};

const loadMore = () =>
  setPage(prevState => 
    prevState + 1
  );

const openModal = content => {
  setModal({
      open: true,
      content,
    }
  );
};

const closeModal = () => {
  setModal({
      open: false,
      content: null,
    }
  );
};

useEffect(() => {
  if (search) {
    fetchGallery();   
  }
}, [search, page, fetchGallery]);


  const { error, gallery, totalPages, loading } = data;

  return (
    <>
      <Searchbar onSubmit={changeSearch} />
      {error && <p>Ошибка поиска</p>}
      {!gallery.length && search && !loading && !error && (
        <p>Ничего не найдено</p>
      )}
      {loading && <Loader />}
      <ImageGallery openModal={openModal} gallery={gallery} />

      {modal.open && (
        <Modal handleClose={closeModal}>
          <div className={style.modal}>
            <img
              className={style.image}
              src={modal.content.largeImageURL}
              alt={modal.content.tags}
            />
          </div>
        </Modal>
      )}
      {Boolean(gallery.length) && totalPages > page && (
        <Button loadMore={loadMore} label="Load more" />
      )}
    </>
  );
};

export default Gallery;
