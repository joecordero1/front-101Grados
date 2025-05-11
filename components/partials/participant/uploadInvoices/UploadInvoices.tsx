import React from "react";
import { useCustomReducer } from "./reducer";
import { Alert, Button, CircularProgress } from "@mui/material";

const UploadInvoices = () => {
  const {
    photoHandleChange,
    createInvoice,
    status,
    imageUrl,
    invoiceCreated,
    errorMsg,
  } = useCustomReducer();
  return (
    <div className="uploadinvoices-container">
      <h2>Sube tus facturas!</h2>
      <input
        type="file"
        onChange={(e) => photoHandleChange(e.target.files[0])}
      />

      {invoiceCreated ? (
        <>
          <img src={imageUrl} alt="snap-photo" width={300} height={300} />
          <Alert severity="success" sx={{ fontSize: 14, marginTop: 2 }}>
            Factura subida con exito!
          </Alert>
        </>
      ) : (
        errorMsg
      )}
      {status === "loading" ? (
        <CircularProgress />
      ) : (
        <Button
          onClick={() => createInvoice()}
          variant="contained"
          color="primary"
          sx={{ marginTop: 2, fontSize: 13 }}
        >
          Subir factura
        </Button>
      )}
    </div>
  );
};

export default UploadInvoices;
