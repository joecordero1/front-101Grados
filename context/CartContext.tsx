import { createContext, FC, ReactNode, useReducer, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { toast } from 'react-toastify';

import CartPopup from '../components/features/product/common/cart-popup';

import { useApiAuth } from '../hooks/useApiAuth';
import {
  CartItem,
  CreateRequestDto,
  AwardVariant,
  RequestTypes,
} from '../utils/types';
import { Address } from '../utils/types';
import { useProgram, useAuth } from 'hooks';

interface State {
  status: 'idle' | 'loading' | 'error';
  items: CartItem[];
  pointsSimulation: number;
  availableAdresses: Address[];
  newAddress: Partial<Address>;
  selectedAdressId: any;
  request: CreateRequestDto;
  sending: boolean;
  imageStatus: boolean;
  awardQuantity: number;
}

interface ContextValue extends State {
  addToCart: (item: CartItem, quantity: number, variant?: AwardVariant) => void;
  removeFromCart: (itemId: number) => void;
  isTheItemOnCart: (itemId: number) => boolean;
  totalAmount: () => number;
  redeemAll: () => void;
  handleNewAddressChange: (field: string, value: any) => void;
  saveAddress: () => void;
  selectAddress: (addressId: number) => void;
  removeAddress: (addressId: number) => void;
  sumQuantity: (itemId: number) => void;
  substractQuantity: (itemId: number) => void;
  resetQuantity: () => void;
}

type SendRequest = {
  type: 'send-request';
  payload: {
    request: CreateRequestDto;
    status: 'idle' | 'loading' | 'error';
  };
};

type SendedRequest = {
  type: 'request-sended';
};
interface ProgramProviderProps {
  children: ReactNode;
}

type InitializeItems = {
  type: 'initialize-items';
  payload: {
    items: CartItem[] | [];
    pointsSimulation: number;
  };
};

type AddToCart = {
  type: 'add-to-cart';
  payload: {
    item: CartItem;
    itemQuantity: number;
    variant?: AwardVariant;
  };
};

type RemoveFromCart = {
  type: 'remove-from-cart';
  payload: { itemId: number };
};

type SimulatePoints = {
  type: 'simulate-points';
  payload: {
    pointsSimulation: number;
  };
};

type RetrieveAddresses = {
  type: 'retrieve-addresses';
  payload: {
    addresses: Address[];
  };
};

type HandleNewAddressChange = {
  type: 'handle-new-address-change';
  payload: {
    field: string;
    value: any;
  };
};

type SaveAddress = {
  type: 'save-address';
};

type ResetQuantity = {
  type: 'reset-quantity';
};

type SelectAddress = {
  type: 'select-address';
  payload: {
    addressId: number;
  };
};

type SumQuantity = {
  type: 'sum-quantity';
  payload: {
    itemId: number;
  };
};

type SubstractQuantity = {
  type: 'substract-quantity';
  payload: {
    itemId: number;
  };
};

type Action =
  | AddToCart
  | RemoveFromCart
  | InitializeItems
  | SimulatePoints
  | RetrieveAddresses
  | HandleNewAddressChange
  | SaveAddress
  | SendRequest
  | SelectAddress
  | SendedRequest
  | SumQuantity
  | SubstractQuantity
  | ResetQuantity;

const initialState: State = {
  status: 'loading',
  items: [],
  pointsSimulation: 0,
  availableAdresses: [],
  newAddress: {},
  selectedAdressId: null,
  request: {} as CreateRequestDto,
  sending: false,
  imageStatus: false,
  awardQuantity: 1,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'initialize-items':
      const { items, pointsSimulation } = action.payload;
      return {
        ...state,
        status: 'idle',
        items,
        pointsSimulation,
      };
    case 'add-to-cart':
      const { item: itemToAdd, itemQuantity, variant } = action.payload;
      return {
        ...state,
        items: [
          ...state.items,
          {
            ...itemToAdd,
            quantity: itemQuantity,
            variant,
          },
        ],
      };
    case 'sum-quantity':
      const { itemId: itemSumId } = action.payload;
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === itemSumId
            ? {
                ...item,
                quantity:
                  item.quantity >= 1 && item.quantity <= 300
                    ? item.quantity + 1
                    : 1,
              }
            : item
        ),
      };
    case 'substract-quantity':
      const { itemId: itemSubstractId } = action.payload;
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === itemSubstractId
            ? {
                ...item,
                quantity:
                  item.quantity > 0 && item.quantity !== 1
                    ? item.quantity - 1
                    : 1,
              }
            : item
        ),
      };

    case 'reset-quantity':
      return {
        ...state,
        awardQuantity: initialState.awardQuantity,
      };

    case 'remove-from-cart':
      const { itemId } = action.payload;

      return {
        ...state,
        items: state.items.filter((item) => item.id !== itemId),
      };
    case 'simulate-points':
      const { pointsSimulation: newPointsSimulation } = action.payload;
      return {
        ...state,
        pointsSimulation: newPointsSimulation,
      };
    case 'retrieve-addresses': {
      const { addresses } = action.payload;
      return {
        ...state,
        status: 'idle',
        availableAdresses: addresses,
        selectedAdressId: '',
      };
    }
    case 'save-address': {
      return {
        ...state,
        newAddress: {},
      };
    }
    case 'handle-new-address-change': {
      const { field, value } = action.payload;
      return {
        ...state,
        newAddress: {
          ...state.newAddress,
          [field]: value,
        },
      };
    }
    case 'select-address': {
      const { addressId } = action.payload;
      return {
        ...state,
        selectedAdressId: addressId,
      };
    }
    case 'send-request': {
      const { request, status } = action.payload;
      return {
        ...state,
        sending: true,
        status,
        request,
      };
    }
    case 'request-sended': {
      return {
        ...state,
        sending: false,
        items: [],
      };
    }
    default:
      return state;
  }
};

export const CartContext = createContext<ContextValue>({
  ...initialState,
  addToCart: () => {},
  removeFromCart: () => {},
  isTheItemOnCart: () => false,
  totalAmount: () => 0,
  redeemAll: () => {},
  handleNewAddressChange: () => {},
  saveAddress: () => {},
  selectAddress: () => {},
  removeAddress: () => {},
  sumQuantity: (itemId: number) => {},
  substractQuantity: (itemId: number) => {},
  resetQuantity: () => {},
});

export const CartProvider: FC<ProgramProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const api = useApiAuth();
  const { participant, availablePoints, isLoggedIn, getAvailablePoints } =
    useAuth();
  const { program } = useProgram();
  const { enqueueSnackbar } = useSnackbar();
  const addToCart = (
    item: CartItem,
    quantity: number,
    variant?: AwardVariant
  ) => {
    dispatch({
      type: 'add-to-cart',
      payload: {
        item,
        itemQuantity: quantity,
        variant,
      },
    });

    toast(<CartPopup product={item} />);
  };

  const removeFromCart = (itemId: number) => {
    dispatch({
      type: 'remove-from-cart',
      payload: {
        itemId,
      },
    });
  };

  const sumQuantity = (itemId: number) => {
    dispatch({
      type: 'sum-quantity',
      payload: {
        itemId,
      },
    });
  };

  const substractQuantity = (itemId: number) => {
    dispatch({
      type: 'substract-quantity',
      payload: {
        itemId,
      },
    });
  };

  const resetQuantity = () => {
    dispatch({
      type: 'reset-quantity',
    });
  };

  const isTheItemOnCart = (itemId: number) => {
    const availableItems = state.items.filter((item) => item.id === itemId);
    if (availableItems.length > 0) return true;
    return false;
  };

  const totalAmount = () => {
    if (state.items.length > 0) {
      return state.items.reduce(
        (acum, current) => acum + current.points * current.quantity,
        0
      );
    }
    return 0;
  };

  const simulatePoints = () => {
    if (state.items.length > 0) {
      const pointsToBuy = totalAmount();
      dispatch({
        type: 'simulate-points',
        payload: {
          pointsSimulation: availablePoints - pointsToBuy,
        },
      });
    } else {
      dispatch({
        type: 'simulate-points',
        payload: {
          pointsSimulation: availablePoints,
        },
      });
    }
  };

  useEffect(() => {
    if (state.status === 'idle') {
      localStorage.setItem(
        'cart',
        JSON.stringify({ participantId: participant.id, items: state.items })
      );
      simulatePoints();
    }
  }, [state.status, state.items]);

  useEffect(() => {
    if (participant) {
      const oldCart: { participantId: number; items: CartItem[] } = JSON.parse(
        localStorage.getItem('cart') || '[]'
      );
      if (oldCart.participantId !== participant.id) {
        dispatch({
          type: 'initialize-items',
          payload: {
            items: [],
            pointsSimulation: availablePoints,
          },
        });
      } else {
        dispatch({
          type: 'initialize-items',
          payload: {
            items: oldCart.items || [],
            pointsSimulation: availablePoints,
          },
        });
      }
    }
  }, [participant]);

  const redeemAll = async () => {
    const ammountToRedeem = totalAmount();
    if (ammountToRedeem <= availablePoints && state.items.length > 0) {
      try {
        for (const item of state.items) {
          for (let index = 0; index < item.quantity; index++) {
            const createRequestData: CreateRequestDto = {
              type: RequestTypes.PARTICIPANT,
              participantId: participant.id,
              awardId: item.award.id,
              addressId: state.selectedAdressId,
              points: item.points,
              ...(item.variant && { variantId: item.variant.id }),
              //cause in cases i have some awards with variants in cart i need to do a array with selected variants and filter one by one by catalogueItemId
              /*      awardVariantId:
                state.selectedVariant && item.award.variants.length > 0 
                  ? state.selectedVariant.filter(
                      (variant) => variant.awardId === item.award.variants.
                    )[0].id
                  : null, */
            };
            dispatch({
              type: 'send-request',
              payload: {
                request: createRequestData,
                status: 'idle',
              },
            });
            await api.post(`/requests`, createRequestData);
          }
        }
        dispatch({
          type: 'request-sended',
        });
        enqueueSnackbar(
          'Has solicitado tu premio. Pronto lo tendrás en tus manos.',
          { variant: 'success' }
        );
        getAvailablePoints();
        dispatch({
          type: 'initialize-items',
          payload: {
            items: [],
            pointsSimulation: 0,
          },
        });
      } catch (e) {
        console.error(e);
        enqueueSnackbar('Lo sentimos, no se pudo realizar la solicitud', {
          variant: 'error',
        });
        dispatch({
          type: 'send-request',
          payload: {
            request: {} as CreateRequestDto,
            status: 'error',
          },
        });
      }
    } else {
      enqueueSnackbar(
        `Lo sentimos, no tiene ${program.coinName} suficientes para el canje`,
        { variant: 'error' }
      );
      console.error(`No tienes los ${program.coinName} suficientes`);
    }
  };
  const retrieveAddresses = async () => {
    try {
      const addresses = await api.get<Address[]>(`/addresses/mine`);
      dispatch({
        type: 'retrieve-addresses',
        payload: {
          addresses,
        },
      });
    } catch (e) {
      console.error('retrieveAddresses(): ', e);
    }
  };

  const handleNewAddressChange = (field: string, value: any) => {
    dispatch({
      type: 'handle-new-address-change',
      payload: {
        field,
        value,
      },
    });
  };

  const saveAddress = async () => {
    try {
      const address = await api.post<Address>(`/addresses`, {
        ...state.newAddress,
        participantId: participant.id,
      });
      dispatch({
        type: 'select-address',
        payload: {
          addressId: address.id,
        },
      });
      dispatch({
        type: 'save-address',
      });
      enqueueSnackbar('Se agrego con exito la dirección', {
        variant: 'success',
      });
      retrieveAddresses();
    } catch (e) {
      console.error('saveAddress(): ', e);
    }
  };
  /*  const selectVariant = (variant: AwardVariant) => {
    dispatch({
      type: 'select-variant',
      payload: {
        variant,
      },
    });
  }; */

  const selectAddress = (addressId: number) => {
    dispatch({
      type: 'select-address',
      payload: {
        addressId,
      },
    });
  };

  //function for removeAddress
  const removeAddress = async (addressId: number) => {
    try {
      await api.delete(`/addresses/${addressId}`);
      enqueueSnackbar('Se elimino con exito la dirección', {
        variant: 'success',
      });
      retrieveAddresses();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) retrieveAddresses();
  }, [isLoggedIn]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        isTheItemOnCart,
        totalAmount,
        redeemAll,
        handleNewAddressChange,
        saveAddress,
        selectAddress,
        removeAddress,
        sumQuantity,
        substractQuantity,
        resetQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
