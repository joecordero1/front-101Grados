import { useReducer } from 'react';
import { useApiAuth } from '~/hooks';
import { Snap } from '~/utils/types';
import { useSnackbar } from 'notistack';

type HandlePhoto = {
  type: 'handle-photo';
  payload: {
    selectedPhoto: any;
  };
};

type SendingInvoice = {
  type: 'sending-invoice';
};

type InvoiceCreated = {
  type: 'invoice-created';
  payload: {
    imageUrl: string;
  };
};

type Error = {
  type: 'error';
  payload: {
    errorMsg: any;
  };
};

type Action = HandlePhoto | InvoiceCreated | SendingInvoice | Error;

type State = {
  status: 'idle' | 'loading' | 'error';
  selectedPhoto: any;
  imageUrl: string;
  invoiceCreated: boolean;
  errorMsg: any;
};

const initialState: State = {
  status: 'idle',
  selectedPhoto: [],
  imageUrl: '',
  invoiceCreated: false,
  errorMsg: null,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'handle-photo': {
      const { selectedPhoto } = action.payload;
      return {
        ...state,
        status: 'idle',
        selectedPhoto,
      };
    }
    case 'sending-invoice': {
      return {
        ...state,
        status: 'loading',
      };
    }
    case 'invoice-created': {
      const { imageUrl } = action.payload;
      return {
        ...state,
        status: 'idle',
        imageUrl,
        invoiceCreated: true,
        selectedPhoto: [],
      };
    }
    case 'error': {
      const { errorMsg } = action.payload;
      return {
        ...state,
        status: 'error',
        errorMsg,
      };
    }
    default:
      return state;
  }
};

export interface ReducerValue extends State {
  photoHandleChange: (image: any) => void;
  createInvoice: () => void;
}

export const useCustomReducer = (): ReducerValue => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const api = useApiAuth();
  const { enqueueSnackbar } = useSnackbar();
  const photoHandleChange = (image: any) => {
    dispatch({
      type: 'handle-photo',
      payload: {
        selectedPhoto: image,
      },
    });
  };

  const createInvoice = async () => {
    if (state.selectedPhoto) {
      try {
        dispatch({
          type: 'sending-invoice',
        });
        const formData = new FormData();

        formData.append('file', state.selectedPhoto);
        const imageUrl = await api.post('/lala4/uploads/snaps', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        await api.post<Snap>('/lala4/snaps/upload', {
          imageUrl: imageUrl.toString(),
        });

        dispatch({
          type: 'invoice-created',
          payload: {
            imageUrl: imageUrl.toString(),
          },
        });
        enqueueSnackbar('Factura Subida Correctamente', {
          variant: 'success',
        });
      } catch (e) {
        enqueueSnackbar(e.response.data.message, {
          variant: 'error',
        });
        console.error('createInvoice(): ', e);
        dispatch({
          type: 'error',
          payload: {
            errorMsg: e.response.data.message,
          },
        });
      }
    }
  };
  return {
    ...state,
    photoHandleChange,
    createInvoice,
  };
};
