import {
  Autocomplete,
  Button,
  Container,
  Input,
  TextField,
} from "@mui/material";
import { useRegisterPdvReducer } from "./reducer";

const CreateGroup = () => {
  const { handlePdvData, participants, createPdv, pdvData } =
    useRegisterPdvReducer();
  return (
    <div
      className="createGroupContainer"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
      }}
    >
      <h3
        style={{
          textAlign: "center",
        }}
      >
        Crear punto de venta
      </h3>
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          width: 370,
          height: 400,
        }}
      >
        <Input
          onChange={(e) => handlePdvData("name", e.target.value.toUpperCase())}
          placeholder="Nombre del punto de venta"
          value={pdvData.name}
          style={{
            fontSize: 16,
          }}
        />

        <Autocomplete
          options={participants}
          sx={{ fontSize: 16 }}
          onChange={(e, value) =>
            handlePdvData("participantSupervisorId", value)
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Seleccione un supervisor"
              style={{
                fontSize: 16,
              }}
            />
          )}
        />
        <Button
          onClick={createPdv}
          variant="contained"
          color="primary"
          style={{
            fontSize: 14,
          }}
        >
          Crear
        </Button>
      </Container>
    </div>
  );
};

export default CreateGroup;
