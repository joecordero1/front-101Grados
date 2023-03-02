import { createContext, FC, ReactNode, useReducer, useEffect } from 'react';
import Script from 'next/script';

import { useApi } from 'hooks';
import { config } from 'utils/config';
import { Program } from 'utils/types';
import { CatalogueItem } from '../utils/types/catalogueItem';

type modalState = {
  open: boolean;
  item: CatalogueItem;
};

interface ProgramState {
  modal: modalState;
}

interface GeneralContextValue extends ProgramState {
  openModal: (item: CatalogueItem) => void;
  closeModal: () => void;
}

interface ProgramProviderProps {
  children: ReactNode;
}

type OpenModal = {
  type: 'OPEN_MODAL';
  payload: {
    item: CatalogueItem;
  };
};

type CloseModal = {
  type: 'CLOSE_MODAL';
};

type Action = OpenModal | CloseModal;

const initialState: ProgramState = {
  modal: {
    open: false,
    item: null,
  },
};

const reducer = (state: ProgramState, action: Action): ProgramState => {
  switch (action.type) {
    case 'OPEN_MODAL': {
      const { item } = action.payload;
      return {
        ...state,
        modal: {
          open: true,
          item,
        },
      };
    }
    case 'CLOSE_MODAL': {
      return {
        ...state,
        modal: {
          open: false,
          item: null,
        },
      };
    }
    default:
      return state;
  }
};

export const GeneralContext = createContext<GeneralContextValue>({
  ...initialState,
  openModal: () => {},
  closeModal: () => {},
});

export const GeneralProvider: FC<ProgramProviderProps> = ({ children }) => {
  const [programState, dispatch] = useReducer(reducer, initialState);

  const openModal = (item: CatalogueItem) => {
    dispatch({
      type: 'OPEN_MODAL',
      payload: {
        item,
      },
    });
  };

  const closeModal = () => {
    document.querySelector('.ReactModal__Overlay').classList.add('removed');
    document.querySelector('.quickview-modal').classList.add('removed');
    // setLoadingState(false);
    // setTimeout(() => {
    //   closeQuickview();
    // }, 330);
    dispatch({
      type: 'CLOSE_MODAL',
    });
  };

  return (
    <GeneralContext.Provider value={{ ...programState, openModal, closeModal }}>
      {children}
    </GeneralContext.Provider>
  );
};
