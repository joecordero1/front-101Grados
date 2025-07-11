import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import ALink from '~/components/features/custom-link';

import { useApiAuth, useProgram, useLogs } from '~/hooks';
import { CatalogueItem, Page } from '~/utils/types';
import { LogType } from '~/utils/types/logType';
import styles from './searchBoxStyles.module.scss';
import { Box, IconButton, TextField, Typography, Button } from '@mui/material';

function SearchForm() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [code, setcode] = useState('');
  const { program } = useProgram();
  const api = useApiAuth();
  const [items, setItems] = useState<CatalogueItem[]>([]);
  const [timer, setTimer] = useState(null);
  const { dispatchLog } = useLogs();
  const [showSecondSearch, setShowSecondSearch] = useState(false); // Estado para controlar la visibilidad del segundo buscador

  const getItems = async () => {
    const params = {
      code: code.length > 2 && code,
      take: 50,
    };
    const query = queryString.stringify(params);
    const { data } = await api.get<Page<CatalogueItem>>(
      '/lala4/catalogue-items/store?' + query
    );
    setItems(data);
  };

  useEffect(() => {
    document.querySelector('body').addEventListener('click', onBodyClick);

    return () => {
      document.querySelector('body').removeEventListener('click', onBodyClick);
    };
  }, []);

  useEffect(() => {
    setSearch('');
  }, [router.query.slug]);

  useEffect(() => {
    if (code.length > 2) {
      getItems();
      if (timer) clearTimeout(timer);
      let timerId = setTimeout(() => {
        setTimer(null);
      }, 500);

      setTimer(timerId);
    }
  }, [code]);

  useEffect(() => {
    document.querySelector('.header-search.show-results') &&
      document
        .querySelector('.header-search.show-results')
        .classList.remove('show-results');
  }, [router.pathname]);

  function removeXSSAttacks(html) {
    const SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

    // Removing the <script> tags
    while (SCRIPT_REGEX.test(html)) {
      html = html.replace(SCRIPT_REGEX, '');
    }

    // Removing all events from tags...
    html = html.replace(/ on\w+="[^"]*"/g, '');

    return {
      __html: html,
    };
  }

  function matchEmphasize(name) {
    let regExp = new RegExp(search, 'i');
    return name.replace(regExp, (match) => '<strong>' + match + '</strong>');
  }

  function onSearchClick(e) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.parentNode.classList.toggle('show');
  }

  function onBodyClick(e) {
    if (e.target.closest('.header-search'))
      return (
        e.target.closest('.header-search').classList.contains('show-results') ||
        e.target.closest('.header-search').classList.add('show-results')
      );

    document.querySelector('.header-search.show') &&
      document.querySelector('.header-search.show').classList.remove('show');
    document.querySelector('.header-search.show-results') &&
      document
        .querySelector('.header-search.show-results')
        .classList.remove('show-results');
  }

  function onSearchChange(e) {
    setSearch(e.target.value);
  }

  function onSubmitSearchForm(e) {
    e.preventDefault();
    router.push({
      pathname: '/shop',
      query: {
        search: search,
      },
    });
    dispatchLog(LogType.SEARCH_AWARD, {
      searchText: search,
    });
  }

  return (
    <div className={styles.searchMainContainer}>
      <div className={styles.searchMerlinContainer}>
        <div className={styles.merlinIconBox}>
          <img
            src={`https://storage.googleapis.com/lala4/store/files/fav-merlin-1-1721681703043.png`}
            alt='Merlin'
          />
        </div>
        <div className={styles.merlinDialogContainer}>
          <Box className={styles.merlinDialogBox}>
            <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
              Mi nombre es Merlin, tu nuevo asistente de compras. Dime, ¿qué
              necesitas?
            </Typography>
          </Box>
          <div className={styles.searchBarContainer}>
            <a
              href='#'
              className='search-toggle'
              role='button'
              onClick={onSearchClick}
            >
              <i className='icon-search-3'></i>
            </a>
            <form
              action='#'
              method='get'
              onSubmit={onSubmitSearchForm}
              className={styles.formSearchContainer}
            >
              <TextField
                variant='standard'
                fullWidth
                name='search'
                autoComplete='off'
                value={search}
                onChange={onSearchChange}
                placeholder='Quiero....'
                disabled={!program.isStoreActive}
                required
                sx={{
                  '& .MuiInputBase-input': {
                    fontSize: '1.5rem',
                    padding: '10px 0',
                  },
                  '& .MuiInputBase-root:before': {
                    borderBottom: '2px solid #ccc',
                  },
                  '& .MuiInputBase-root:after': {
                    borderBottom: '2px solid #3f51b5',
                  },
                  '& .MuiInputBase-input::placeholder': {
                    fontSize: '1.2rem',
                    color: '#000',
                  },
                }}
              />

              <IconButton className='' type='submit'>
                <AutoFixHighIcon />
              </IconButton>
            </form>
          </div>

          {/* Botón para mostrar/ocultar el segundo buscador */}
          <div className={styles.toggleButtonContainer}>
            <Button
              onClick={() => setShowSecondSearch(!showSecondSearch)}
              aria-label='toggle search by code'
              endIcon={
                showSecondSearch ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
              }
            >
              Buscar por código
            </Button>
          </div>

          {/* Segundo buscador (oculto por defecto) */}
          {showSecondSearch && (
            <div className={styles.searchBarContainer}>
              <form
                action='#'
                method='get'
                onSubmit={onSubmitSearchForm}
                className={styles.formSearchContainer}
              >
                <TextField
                  variant='standard'
                  fullWidth
                  name='search'
                  autoComplete='off'
                  value={code}
                  onChange={(e) => setcode(e.target.value)}
                  placeholder='Buscar por código'
                  disabled={!program.isStoreActive}
                  required
                  sx={{
                    '& .MuiInputBase-input': {
                      fontSize: '1.5rem',
                      padding: '10px 0',
                    },
                    '& .MuiInputBase-root:before': {
                      borderBottom: '2px solid #ccc',
                    },
                    '& .MuiInputBase-root:after': {
                      borderBottom: '2px solid #3f51b5',
                    },
                    '& .MuiInputBase-input::placeholder': {
                      fontSize: '1.2rem',
                      color: '#000',
                    },
                  }}
                />

                <IconButton className='' type='submit'>
                  <AutoFixHighIcon />
                </IconButton>

                {/* Resultados de búsqueda en forma de lista con desplazamiento */}
                <div className={styles.searchResultsContainer}>
                  {code.length > 2 &&
                    items &&
                    items.map((product, index) => (
                      <ALink
                        href={`/award/${product.award.id}`}
                        className={styles.autocompleteSuggestion}
                        key={`search-result-${index}`}
                      >
                        <LazyLoadImage
                          effect='opacity'
                          src={product.award.mainImage}
                          width={40}
                          height={40}
                          alt='product'
                        />
                        <div
                          className={styles.searchName}
                          dangerouslySetInnerHTML={removeXSSAttacks(
                            matchEmphasize(
                              `${product.award.name} ${
                                product.award.brand.name &&
                                `| ${product.award.brand.name}`
                              }${
                                product.award.model &&
                                `| ${product.award.model}`
                              }`
                            )
                          )}
                        ></div>
                        <span className={styles.searchPrice}>
                          {product.points} {program.coinName}
                        </span>
                      </ALink>
                    ))}
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchForm;
