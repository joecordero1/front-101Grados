import { Button, Container } from '@mui/material';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { useApiAuth, useAuth, useProgram } from '~/hooks';
const PrivacyPolicy = () => {
  const { program } = useProgram();
  const router = useRouter();
  const { put } = useApiAuth();
  const [isAccepted, setAccepted] = useState(false);
  const { isLoggedIn, participant, setSession } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const acceptTerms = async () => {
    try {
      await put('/lala4/participants/mine', {
        approvedPolicy: true,
        approvedTermsAndConditions: true,
      });
      enqueueSnackbar(
        'Politica de privacidad de datos y términos y condiciones aceptados correctamente',
        {
          variant: 'success',
        }
      );
      setSession();
      setAccepted(true);
      if (program.id === 26) {
        if (isLoggedIn && participant?.passwordUpdatedAt) {
          // Definir la fecha actual
          const currentDate = new Date();

          // Crear una nueva instancia de la fecha de actualización de la contraseña
          const passwordUpdatedDate = new Date(participant.passwordUpdatedAt);

          // Restar los días a la fecha actual para obtener la fecha de comparación
          const comparisonDate = new Date();
          comparisonDate.setDate(currentDate.getDate() - 365);

          // Comparar las fechas
          if (passwordUpdatedDate <= comparisonDate) {
            router.push('/pages/change-my-password');
          } else {
            router.push('/');
          }
        }
      }
    } catch (error) {
      console.error(error, 'acceptTerms');
      enqueueSnackbar(
        'Error al aceptar la política de privacidad de datos y términos y condiciones',
        {
          variant: 'error',
        }
      );
    }
  };

  useEffect(() => {
    if (isAccepted && isLoggedIn) {
      router.push('/');
    }
  }, [participant.approvedPolicy, participant.approvedTermsAndConditions]);
  return (
    <div>
      <Helmet>
        <title>Politica de privacidad de datos y Terminos y condiciones</title>
      </Helmet>
      <Container sx={{ mt: 2, mb: 7, fontSize: 20 }}>
        {program.id === 26 ? (
          <p>
            Política de privacidad de datos y terminos y condiciones de Mr
            Chancho En Escena. En Mr. Chancho En Escena, nos tomamos su
            privacidad muy en serio. Esta Política de privacidad explica cómo
            recopilamos, usamos y divulgamos su información personal cuando
            utiliza nuestra plataforma Mr Chancho En Escena. ¿Qué es Mr. Chancho
            En Escena? &quot;Mr. Chancho en escena&quot; es un programa de
            incentivos que premia con puntos (estrellas) a nuestros clientes. El
            plan, las condiciones del mismo, así como sus indicadores y premios
            podrán cambiar o cancelarse sin necesidad de previo aviso a los
            participantes. ¿Cuál es la vigencia? El programa tiene vigencia
            hasta el 31 de diciembre de 2025 ¿Quién participa? El plan es
            únicamente para clientes de Pronaca y no representa o implica
            ninguna relación de dependencia, ni obligación de ley con Pronaca o
            sus afiliadas. ¿Qué puede canjear el participante? La cantidad de
            puntos ganados son canjeables mensualmente o pueden ser acumulados
            para ser canjeados por premios al finalizar el programa. Los puntos
            pueden ser canjeados únicamente por los premios presentados en el
            catálogo físico o digital. El stock de los premios se actualiza
            constantemente en el catálogo virtual. Los puntos se cargarán de
            acuerdo con la información enviada y validada por Pronaca. Los
            puntos no son canjeables por dinero, ni son transferibles a
            terceros. ¿Cómo canjear? Para conocer la cantidad de puntos
            disponibles, el participante debe ingresar a la página web
            www.mrchanchoenescena.com  con el usuario y contraseña asignados
            previamente. Para canjear premios, el participante debe ingresar a
            la página web www.mrchanchoenescena.com  y dirigirse a la sección
            &quot;Tienda&quot;, escoger el artículo de su preferencia y
            confirmar su compra. Una vez elegido el premio no se admiten cambios
            de ningún tipo. ¿Cuál es el proceso de entrega? La entrega de
            premios se hará en coordinación con el participante y mediante
            courier nacional. A partir de la entrega y recepción del artículo o
            premio, el premio pasa a ser propiedad del participante. Los premios
            serán entregados según su disponibilidad de inventario. En caso de
            que el premio no se encuentre disponible, se reemplazará por un
            premio de características y marcas similares o se hará la devolución
            completa de los puntos, con previa comunicación al participante.
            ¿Cómo funciona la garantía? El tiempo de garantía de los premios
            varía entre tres meses a un año dependiendo del tipo de producto.
            Para la ejecución de la garantía, se debe entregar el artículo
            defectuoso en su empaque original y el tiempo de reparación
            dependerá del daño. La garantía no cubre daños por errores en la
            instalación, manipulación o daños relacionados con sobrecargas o
            variaciones de voltaje. Cuando usted acepta esta política, el
            participante acepta recibir al equipo de servicio técnico de la
            marca o proveedor del artículo, con el fin de revisar el artefacto
            defectuoso. ¿Qué información recopilamos?  Cuando usted acepta esta
            política, podemos recopilar la siguiente información de usted:
            Nombre, Apellido, Número de teléfono, Dirección de correo
            electrónico, Documento de identificación o RUC, código de cliente
            Pronaca y datos de compras mensuales realizadas a Pronaca. Además,
            la plataforma podría requerir acceso a la cámara y la galería de su
            dispositivo para su funcionamiento. ¿Cómo utilizamos su
            información?  Utilizamos la información que recopilamos
            para: Crear y administrar su cuenta, entregarle los puntos ganados,
            enviar premios, enviar mensajes informativos sobre el programa Mr.
            Chancho En Escena y cualquier otro comunicado previamente aprobado
            por Pronaca. Además, usamos su información para reportar su
            actividad dentro de la plataforma a Pronaca, proporcionarle soporte
            al usuario, comunicarnos con usted sobre la plataforma y cualquier
            actualización o cambio, mejorar la plataforma y sus características,
            realizar investigaciones y análisis para comprender mejor cómo se
            utiliza la plataforma. También podemos utilizar su información
            personal para cumplir con obligaciones legales, proteger nuestros
            derechos e intereses y prevenir actividades fraudulentas o ilegales.
            ¿Cómo protegemos su información?  Tomamos medidas razonables para
            proteger su información personal contra acceso, uso y divulgación no
            autorizados. Utilizamos protocolos de cifrado de estándar industrial
            para asegurar la transmisión de datos entre su
            dispositivo y nuestros servidores. También restringimos el acceso a
            su información personal a empleados que necesitan conocer la
            información para proporcionarle los servicios ofrecidos por la
            plataforma.   ¿Divulgamos su información a terceros?  No vendemos,
            alquilamos ni compartimos su información personal, ni la información
            que usted carga a la plataforma con terceros para fines comerciales
            o de marketing. Podemos divulgar su información personal a
            proveedores de servicios de terceros que nos ayudan a proporcionar
            los servicios ofrecidos por la plataforma, como datos para la
            entrega puntos y premios y gestión de garantías. Estos proveedores
            de servicios están obligados contractualmente a proteger su
            información personal y solo pueden utilizarla para el propósito
            específico para el que se divulgó. También podemos divulgar su
            información personal si estamos obligados a hacerlo por ley o en
            respuesta a una solicitud legal de una agencia gubernamental o un
            organismo regulador. ¿Cómo puede acceder y controlar su
            información?  Puede acceder y actualizar su información personal
            iniciando sesión en su cuenta en la plataforma. También puede
            solicitar que eliminemos su información personal contactándonos por
            el chat de Mr. Pro o a través de su asesor comercial Pronaca. Tenga
            en cuenta que podemos conservar cierta información según lo
            requerido por la ley o para fines comerciales legítimos. Cambios en
            nuestra Política de privacidad: Podemos actualizar esta Política de
            privacidad de vez en cuando para reflejar cambios en nuestras
            prácticas o para cumplir con las leyes aplicables. Le notificaremos
            de cualquier cambio importante publicando un aviso en la plataforma,
            por correo electrónico o whatsapp.  Contáctenos: Si tiene alguna
            pregunta o inquietud sobre esta Política de privacidad, comuníquese
            con nosotros mediante el chat de Mr. Pro o a través de su asesor
            comercial Pronaca. Al utilizar la plataforma, usted acepta nuestra
            recopilación, uso y divulgación de su información de acuerdo a lo
            indicado en esta política.
          </p>
        ) : program.id === 33 ? (
          <p>
            Política de privacidad de datos y terminos y condiciones de
            NutriExpertos En NutriExpertos, nos tomamos su privacidad muy en
            serio. Esta Política de privacidad explica cómo recopilamos, usamos
            y divulgamos su información personal cuando utiliza nuestra
            aplicación móvil NutriExpertos. ¿Qué información recopilamos? Cuando
            se registra para usar la Aplicación, podemos recopilar la siguiente
            información de usted: Nombre Apellido, Número de teléfono, Dirección
            de correo electrónico Documento de identificación. Además, la
            Aplicación puede requerir acceso a la cámara y la galería de su
            dispositivo para su funcionamiento. ¿Cómo utilizamos su información?
            Utilizamos la información que recopilamos para: Crear y administrar
            su cuenta, Proporcionarle soporte al cliente, Comunicarnos con usted
            sobre la Aplicación y cualquier actualización o cambio, Mejorar la
            Aplicación y sus características, Realizar investigaciones y
            análisis para comprender mejor cómo se utiliza la Aplicación,
            También podemos utilizar su información personal para cumplir con
            obligaciones legales, proteger nuestros derechos e intereses y
            prevenir actividades fraudulentas o ilegales. ¿Cómo protegemos su
            información? Tomamos medidas razonables para proteger su información
            personal contra acceso, uso y divulgación no autorizados. Utilizamos
            protocolos de cifrado de estándar industrial para asegurar la
            transmisión de datos entre su dispositivo y nuestros servidores.
            También restringimos el acceso a su información personal a empleados
            que necesitan conocer la información para proporcionarle los
            servicios ofrecidos por la Aplicación. ¿Divulgamos su información a
            terceros? No vendemos, alquilamos ni compartimos su información
            personal, ni la información que usted carga a la aplicación con
            terceros para fines comerciales o de marketing. Podemos divulgar su
            información personal a proveedores de servicios de terceros que nos
            ayudan a proporcionar los servicios ofrecidos por la Aplicación.
            Estos proveedores de servicios están obligados contractualmente a
            proteger su información personal y solo pueden utilizarla para el
            propósito específico para el que se divulgó. También podemos
            divulgar su información personal si estamos obligados a hacerlo por
            ley o en respuesta a una solicitud legal de una agencia
            gubernamental o un organismo regulador. ¿Cómo puede acceder y
            controlar su información? Puede acceder y actualizar su información
            personal iniciando sesión en su cuenta en la Aplicación. También
            puede solicitar que eliminemos su información personal
            contactándonos en 0981671571. Tenga en cuenta que podemos conservar
            cierta información según lo requerido por la ley o para fines
            comerciales legítimos. Cambios en nuestra Política de privacidad
            Podemos actualizar esta Política de privacidad de vez en cuando para
            reflejar cambios en nuestras prácticas o para cumplir con las leyes
            aplicables. Le notificaremos de cualquier cambio importante
            publicando un aviso en la Aplicación o por correo electrónico.
            Contáctenos Si tiene alguna pregunta o inquietud sobre esta Política
            de privacidad, comuníquese con nosotros en 0981671571. Al utilizar
            la Aplicación, usted acepta nuestra recopilación, uso y divulgación
            de su información
          </p>
        ) : (
          <p>
            Política de privacidad de datos y terminos y condiciones de{' '}
            {program.name} En {program.name}, nos tomamos su privacidad muy en
            serio. Esta Política de privacidad explica cómo recopilamos, usamos
            y divulgamos su información personal cuando utiliza nuestra
            aplicación móvil {program.name}. ¿Qué información recopilamos?
            Cuando se registra para usar la Aplicación, podemos recopilar la
            siguiente información de usted: Nombre Apellido Número de teléfono
            Dirección de correo electrónico Documento de identificación. Además,
            la Aplicación puede requerir acceso a la cámara y la galería de su
            dispositivo para su funcionamiento. ¿Cómo utilizamos su información?
            Utilizamos la información que recopilamos para: Crear y administrar
            su cuenta, Proporcionarle soporte al cliente, Comunicarnos con usted
            sobre la Aplicación y cualquier actualización o cambio, Mejorar la
            Aplicación y sus características, Realizar investigaciones y
            análisis para comprender mejor cómo se utiliza la Aplicación,
            También podemos utilizar su información personal para cumplir con
            obligaciones legales, proteger nuestros derechos e intereses y
            prevenir actividades fraudulentas o ilegales. ¿Cómo protegemos su
            información? Tomamos medidas razonables para proteger su información
            personal contra acceso, uso y divulgación no autorizados. Utilizamos
            protocolos de cifrado de estándar industrial para asegurar la
            transmisión de datos entre su dispositivo y nuestros servidores.
            También restringimos el acceso a su información personal a empleados
            que necesitan conocer la información para proporcionarle los
            servicios ofrecidos por la Aplicación. ¿Divulgamos su información a
            terceros? No vendemos, alquilamos ni compartimos su información
            personal, ni la información que usted carga a la aplicación con
            terceros para fines comerciales o de marketing. Podemos divulgar su
            información personal a proveedores de servicios de terceros que nos
            ayudan a proporcionar los servicios ofrecidos por la Aplicación.
            Estos proveedores de servicios están obligados contractualmente a
            proteger su información personal y solo pueden utilizarla para el
            propósito específico para el que se divulgó. También podemos
            divulgar su información personal si estamos obligados a hacerlo por
            ley o en respuesta a una solicitud legal de una agencia
            gubernamental o un organismo regulador. ¿Cómo puede acceder y
            controlar su información? Puede acceder y actualizar su información
            personal iniciando sesión en su cuenta en la Aplicación. También
            puede solicitar que eliminemos su información personal
            contactándonos en{' '}
            {program.supportPhone.length > 0
              ? program.supportPhone
              : program.supportEmail}
            . Tenga en cuenta que podemos conservar cierta información según lo
            requerido por la ley o para fines comerciales legítimos. Cambios en
            nuestra Política de privacidad Podemos actualizar esta Política de
            privacidad de vez en cuando para reflejar cambios en nuestras
            prácticas o para cumplir con las leyes aplicables. Le notificaremos
            de cualquier cambio importante publicando un aviso en la Aplicación
            o por correo electrónico. Contáctenos Si tiene alguna pregunta o
            inquietud sobre esta Política de privacidad, comuníquese con
            nosotros en{' '}
            {program.supportPhone.length > 0
              ? program.supportPhone
              : program.supportEmail}
            . Al utilizar la Aplicación, usted acepta nuestra recopilación, uso
            y divulgación de su información
          </p>
        )}
        {isLoggedIn && (
          <Button
            type='button'
            variant='contained'
            size='large'
            style={{ fontSize: 15 }}
            color='primary'
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
