import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import { Address } from "~/utils/types";
import { useCart } from "~/hooks";

export default function AddressesList({ addresses }: { addresses: Address[] }) {
  const { selectAddress, selectedAdressId, removeAddress, status } = useCart();

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        fontSize: 30,
      }}
    >
      {addresses.map((address) => {
        return (
          <ListItem key={address.id} disablePadding>
            <ListItemButton
              role={undefined}
              onClick={() => selectAddress(address.id)}
              dense
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={selectedAdressId === address.id ? true : false}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": address.id.toString() }}
                />
              </ListItemIcon>
              <p id={address.id.toString()} style={{ fontSize: 16, margin: 8 }}>
                {`${address.alias} - ${address.mainStreet} ${address.secondaryStreet}`}
              </p>
            </ListItemButton>
            <IconButton
              color="error"
              onClick={() => removeAddress(address.id)}
              disabled={status === "loading" ? true : false}
            >
              Eliminar
            </IconButton>
          </ListItem>
        );
      })}
    </List>
  );
}
