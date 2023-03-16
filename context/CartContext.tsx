import { createContext, FC, ReactNode, useReducer, useEffect } from "react";
import Router from "next/router";

import { useApiAuth } from "../hooks/useApiAuth";
import { CatalogueItem, Page } from "../utils/types";
import { Address } from "../utils/types";
import { useProgram } from "../hooks/useProgram";
import { AwardVariant } from "../utils/types";
import { useAuth } from "~/hooks";
import { useSnackbar } from "notistack";

interface State {
  status: "idle" | "loading";
  items: CatalogueItem[];
  pointsSimulation: number;
  availableAdresses: Address[];
  newAddress: Partial<Address>;
  selectedAdressId: any;
  request: CreateRequestDto;
  sending: boolean;
  selectedVariant: AwardVariant[];
  imageStatus: boolean;
  awardQuantity: number;
}

interface ContextValue extends State {
  addToCart: (item: CatalogueItem, quantity: number) => void;
  removeFromCart: (itemId: number) => void;
  isTheItemOnCart: (itemId: number) => boolean;
  totalAmount: () => number;
  /* redeemAll: () => void; */
  handleNewAddressChange: (field: string, value: any) => void;
  saveAddress: () => void;
  selectAddress: (addressId: number) => void;
  selectVariant: (variant: AwardVariant) => void;
  removeAddress: (addressId: number) => void;
  sumQuantity: (itemId: number) => void;
  substractQuantity: (itemId: number) => void;
  resetQuantity: () => void;
}

type CreateRequestDto = {
  type: "SOLICITUD PARTICIPANTE";
  participantId: number;
  catalogueItemId: number;
  addressId: number | null;
  awardVariantId?: number | null;
};
type SendRequest = {
  type: "send-request";
  payload: {
    request: CreateRequestDto;
  };
};
type SendedRequest = {
  type: "request-sended";
};
interface ProgramProviderProps {
  children: ReactNode;
}

type InitializeItems = {
  type: "initialize-items";
  payload: {
    items: CatalogueItem[] | [];
    pointsSimulation: number;
  };
};

type AddToCart = {
  type: "add-to-cart";
  payload: {
    item: CatalogueItem;
    itemQuantity: number;
  };
};

type RemoveFromCart = {
  type: "remove-from-cart";
  payload: { itemId: number };
};

type SimulatePoints = {
  type: "simulate-points";
  payload: {
    pointsSimulation: number;
  };
};

type RetrieveAddresses = {
  type: "retrieve-addresses";
  payload: {
    addresses: Address[];
  };
};

type HandleNewAddressChange = {
  type: "handle-new-address-change";
  payload: {
    field: string;
    value: any;
  };
};

type SaveAddress = {
  type: "save-address";
};

type ResetQuantity = {
  type: "reset-quantity";
};

type SelectAddress = {
  type: "select-address";
  payload: {
    addressId: number;
  };
};
type SelectVariant = {
  type: "select-variant";
  payload: {
    variant: AwardVariant;
  };
};

type SumQuantity = {
  type: "sum-quantity";
  payload: {
    itemId: number;
  };
};

type SubstractQuantity = {
  type: "substract-quantity";
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
  | ResetQuantity
  | SelectVariant;

const initialState: State = {
  status: "loading",
  items: [],
  pointsSimulation: 0,
  availableAdresses: [],
  newAddress: {},
  selectedAdressId: null,
  request: {
    type: "SOLICITUD PARTICIPANTE",
    participantId: 0,
    catalogueItemId: 0,
    addressId: null,
  },
  sending: false,
  selectedVariant: [],
  imageStatus: false,
  awardQuantity: 1,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "initialize-items":
      const { items, pointsSimulation } = action.payload;
      return {
        ...state,
        status: "idle",
        items,
        pointsSimulation,
      };
    case "add-to-cart":
      const { item: itemToAdd, itemQuantity } = action.payload;
      return {
        ...state,
        items: [
          ...state.items,
          {
            ...itemToAdd,
          },
        ],
      };
    /*     case "sum-quantity":
      const { itemId: itemSumId } = action.payload;
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === itemSumId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      }; */
    /*    case "substract-quantity":
      const { itemId: itemSubstractId } = action.payload;
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === itemSubstractId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      }; */

    case "reset-quantity":
      return {
        ...state,
        awardQuantity: initialState.awardQuantity,
      };

    case "remove-from-cart":
      const { itemId } = action.payload;

      return {
        ...state,
        items: state.items.filter((item) => item.id !== itemId),
      };
    case "simulate-points":
      const { pointsSimulation: newPointsSimulation } = action.payload;
      return {
        ...state,
        pointsSimulation: newPointsSimulation,
      };
    case "retrieve-addresses": {
      const { addresses } = action.payload;
      return {
        ...state,
        status: "idle",
        availableAdresses: addresses,
        selectedAdressId: "",
      };
    }
    case "save-address": {
      return {
        ...state,
        newAddress: {},
      };
    }
    case "handle-new-address-change": {
      const { field, value } = action.payload;
      return {
        ...state,
        newAddress: {
          ...state.newAddress,
          [field]: value,
        },
      };
    }
    case "select-address": {
      const { addressId } = action.payload;
      return {
        ...state,
        selectedAdressId: addressId,
      };
    }
    case "send-request": {
      const { request } = action.payload;
      return {
        ...state,
        sending: true,
        request,
      };
    }
    case "request-sended": {
      return {
        ...state,
        sending: false,
        selectedVariant: [],
      };
    }
    //cause in cases i have some awards with variants in cart i need to do a array with selected variants and filter one by one by catalogueItemId
    case "select-variant": {
      const { variant } = action.payload;
      return {
        ...state,
        selectedVariant: [...state.selectedVariant, variant],
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
  /* redeemAll: () => {}, */
  handleNewAddressChange: () => {},
  saveAddress: () => {},
  selectAddress: () => {},
  selectVariant: () => {},
  removeAddress: () => {},
  sumQuantity: (itemId: number) => {},
  substractQuantity: (itemId: number) => {},
  resetQuantity: () => {},
});

export const CartProvider: FC<ProgramProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const api = useApiAuth();
  const { participant } = useAuth();
  const { program } = useProgram();
  const { enqueueSnackbar } = useSnackbar();
  const addToCart = (item: CatalogueItem, quantity: number) => {
    dispatch({
      type: "add-to-cart",
      payload: {
        item,
        itemQuantity: quantity,
      },
    });

    enqueueSnackbar("¡Premio añadido!", {
      variant: "success",
    });
  };

  const removeFromCart = (itemId: number) => {
    dispatch({
      type: "remove-from-cart",
      payload: {
        itemId,
      },
    });
  };

  const sumQuantity = (itemId: number) => {
    dispatch({
      type: "sum-quantity",
      payload: {
        itemId,
      },
    });
  };

  const substractQuantity = (itemId: number) => {
    dispatch({
      type: "substract-quantity",
      payload: {
        itemId,
      },
    });
  };

  const resetQuantity = () => {
    dispatch({
      type: "reset-quantity",
    });
  };

  const isTheItemOnCart = (itemId: number) => {
    const availableItems = state.items.filter((item) => item.id === itemId);
    if (availableItems.length > 0) return true;
    return false;
  };

  const totalAmount = () => {
    if (state.items.length > 0) {
      return state.items.reduce((acum, current) => acum + current.points, 0);
    }
    return 0;
  };

  /*  const simulatePoints = () => {
    if (state.items.length > 0) {
      const pointsToBuy = totalAmount();
      dispatch({
        type: "simulate-points",
        payload: {
          pointsSimulation: participant.availablePoints - pointsToBuy,
        },
      });
    } else {
      dispatch({
        type: "simulate-points",
        payload: {
          pointsSimulation: participant.availablePoints,
        },
      });
    }
  }; */

  /* useEffect(() => {
    if (state.status === "idle") {
      localStorage.setItem(
        "cart",
        JSON.stringify({ participantId: participant.id, items: state.items })
      );
      simulatePoints();
    }
  }, [state.status, state.items]); */

  /*  useEffect(() => {
    if (participant) {
      const oldCart: { participantId: number; items: CatalogueItem[] } =
        JSON.parse(localStorage.getItem("cart") || "[]");
      if (oldCart.participantId !== participant.id) {
        dispatch({
          type: "initialize-items",
          payload: {
            items: [],
            pointsSimulation: participant.availablePoints,
          },
        });
      } else {
        dispatch({
          type: "initialize-items",
          payload: {
            items: oldCart.items || [],
            pointsSimulation: participant.availablePoints,
          },
        });
      }
    }
  }, [participant]); */

  /*  const redeemAll = async () => {
    const ammountToRedeem = totalAmount();
    if (
      ammountToRedeem <= participant.availablePoints &&
      state.items.length > 0
    ) {
      try {
        for (const item of state.items) {
          for (let index = 0; index < item.quantity; index++) {
            const createRequestData: CreateRequestDto = {
              type: "SOLICITUD PARTICIPANTE",
              participantId: participant.id,
              catalogueItemId: item.id,
              addressId: state.selectedAdressId,
              //cause in cases i have some awards with variants in cart i need to do a array with selected variants and filter one by one by catalogueItemId
              awardVariantId:
                state.selectedVariant && item.award.hasVariants
                  ? state.selectedVariant.filter(
                      (variant) => variant.catalogueItemId === item.id
                    )[0].variantId
                  : null,
            };
            dispatch({
              type: "send-request",
              payload: {
                request: createRequestData,
              },
            });
            await axios.post(`/requests`, createRequestData);
          }
        }
        dispatch({
          type: "request-sended",
        });
        notification.open({
          message: "¡Felicitaciones!",
          description:
            "Has solicitado tu premio. Pronto lo tendrás en tus manos.",
          type: "success",
          duration: 3,
        });

        // localStorage.setItem('cart', JSON.stringify([]));
        dispatch({
          type: "initialize-items",
          payload: {
            items: [],
            pointsSimulation: 0,
          },
        });
      } catch (e) {
        console.error(e);
        notification.open({
          message: "Error",
          description:
            "Lo sentimos, algo inesperado ha ocurrido. Inténtalo más tarde",
          type: "error",
          duration: 3,
        });
        dispatch({
          type: "request-sended",
        });
      }
    } else {
      notification.open({
        message: "Error",
        description: `Lo sentimos, no tiene ${program.coinName} suficientes para el canje`,
        type: "error",
        duration: 3,
      });
      console.error(`No tienes los ${program.coinName} suficientes`);
    }
  }; */
  const retrieveAddresses = async () => {
    try {
      if (participant !== null) {
        const { data: addresses } = await api.get<Page<Address>>(
          `/addresses/mine`
        );

        dispatch({
          type: "retrieve-addresses",
          payload: {
            addresses,
          },
        });
      }
    } catch (e) {
      console.error("retrieveAddresses(): ", e);
    }
  };

  useEffect(() => {
    if (participant) retrieveAddresses();
  }, []);

  const handleNewAddressChange = (field: string, value: any) => {
    dispatch({
      type: "handle-new-address-change",
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
        type: "select-address",
        payload: {
          addressId: address.id,
        },
      });
      dispatch({
        type: "save-address",
      });
      enqueueSnackbar("Se agrego con exito la dirección", {
        variant: "success",
      });
      retrieveAddresses();
    } catch (e) {
      console.error("saveAddress(): ", e);
      enqueueSnackbar("debes cambiar los datos para una nueva direcció", {
        variant: "error",
      });
    }
  };
  const selectVariant = (variant: AwardVariant) => {
    dispatch({
      type: "select-variant",
      payload: {
        variant,
      },
    });
  };

  const selectAddress = (addressId: number) => {
    dispatch({
      type: "select-address",
      payload: {
        addressId,
      },
    });
  };

  //function for removeAddress
  const removeAddress = async (addressId: number) => {
    try {
      await api.delete(`/addresses/${addressId}`);
      enqueueSnackbar("Se elimino con exito la dirección", {
        variant: "success",
      });
      retrieveAddresses();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        isTheItemOnCart,
        totalAmount,
        /* redeemAll, */
        handleNewAddressChange,
        saveAddress,
        selectAddress,
        selectVariant,
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
