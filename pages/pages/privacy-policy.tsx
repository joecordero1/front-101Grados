import { Button, Container } from "@mui/material";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React from "react";
import Helmet from "react-helmet";
import { useApiAuth, useAuth, useProgram } from "~/hooks";
const PrivacyPolicy = () => {
  const { program } = useProgram();
  const router = useRouter();
  const { put } = useApiAuth();
  const { isLoggedIn } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const acceptTerms = async () => {
    try {
      await put("/participants/mine", {
        approvedPolicy: true,
        approvedTermsAndConditions: true,
      });
      enqueueSnackbar(
        "Politica de privacidad de datos y términos y condiciones aceptados correctamente",
        {
          variant: "success",
        }
      );
      router.push("/");
    } catch (error) {
      console.error(error, "acceptTerms");
      enqueueSnackbar("Error al aceptar los términos y condiciones", {
        variant: "error",
      });
    }
  };
  return (
    <div>
      <Helmet>
        <title>Politica de privacidad de datos y Terminos y condiciones</title>
      </Helmet>
      <Container sx={{ mt: 2, mb: 7, fontSize: 20 }}>
        <p>
          Política de privacidad para {program.name} En {program.name}, nos
          tomamos su privacidad muy en serio. Esta Política de privacidad
          explica cómo recopilamos, usamos y divulgamos su información personal
          cuando utiliza nuestra aplicación móvil {program.name}. ¿Qué
          información recopilamos? Cuando se registra para usar la Aplicación,
          podemos recopilar la siguiente información de usted: Nombre Apellido
          Número de teléfono Dirección de correo electrónico Documento de
          identificación Además, la Aplicación puede requerir acceso a la cámara
          y la galería de su dispositivo para su funcionamiento. ¿Cómo
          utilizamos su información? Utilizamos la información que recopilamos
          para: Crear y administrar su cuenta Proporcionarle soporte al cliente
          Comunicarnos con usted sobre la Aplicación y cualquier actualización o
          cambio Mejorar la Aplicación y sus características Realizar
          investigaciones y análisis para comprender mejor cómo se utiliza la
          Aplicación También podemos utilizar su información personal para
          cumplir con obligaciones legales, proteger nuestros derechos e
          intereses y prevenir actividades fraudulentas o ilegales. ¿Cómo
          protegemos su información? Tomamos medidas razonables para proteger su
          información personal contra acceso, uso y divulgación no autorizados.
          Utilizamos protocolos de cifrado de estándar industrial para asegurar
          la transmisión de datos entre su dispositivo y nuestros servidores.
          También restringimos el acceso a su información personal a empleados
          que necesitan conocer la información para proporcionarle los servicios
          ofrecidos por la Aplicación. ¿Divulgamos su información a terceros? No
          vendemos, alquilamos ni compartimos su información personal con
          terceros para fines de marketing. Podemos divulgar su información
          personal a proveedores de servicios de terceros que nos ayudan a
          proporcionar los servicios ofrecidos por la Aplicación. Estos
          proveedores de servicios están obligados contractualmente a proteger
          su información personal y solo pueden utilizarla para el propósito
          específico para el que se divulgó. También podemos divulgar su
          información personal si estamos obligados a hacerlo por ley o en
          respuesta a una solicitud legal de una agencia gubernamental o un
          organismo regulador. ¿Cómo puede acceder y controlar su información?
          Puede acceder y actualizar su información personal iniciando sesión en
          su cuenta en la Aplicación. También puede solicitar que eliminemos su
          información personal contactándonos en{" "}
          {program.supportPhone.length > 0
            ? program.supportPhone
            : program.supportEmail}
          . Tenga en cuenta que podemos conservar cierta información según lo
          requerido por la ley o para fines comerciales legítimos. Cambios en
          nuestra Política de privacidad Podemos actualizar esta Política de
          privacidad de vez en cuando para reflejar cambios en nuestras
          prácticas o para cumplir con las leyes aplicables. Le notificaremos de
          cualquier cambio importante publicando un aviso en la Aplicación o por
          correo electrónico. Contáctenos Si tiene alguna pregunta o inquietud
          sobre esta Política de privacidad, comuníquese con nosotros en{" "}
          {program.supportPhone.length > 0
            ? program.supportPhone
            : program.supportEmail}
          . Al utilizar la Aplicación, usted acepta nuestra recopilación, uso y
          divulgación de su información
        </p>
        {isLoggedIn && (
          <Button
            type="button"
            variant="contained"
            size="large"
            style={{ fontSize: 15 }}
            color="primary"
            onClick={() => acceptTerms()}
          >
            Acepto la política de privacidad de datos y los terminos y
            condiciones
          </Button>
        )}
      </Container>
    </div>
  );
};

export default PrivacyPolicy;
