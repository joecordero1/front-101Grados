import {
  Card,
  Typography,
  Box,
  alpha,
  LinearProgress,
  linearProgressClasses,
  styled,
} from '@mui/material';
import { Divider, Stack } from '@mui/material';

import { useAuth, useProgram } from 'hooks';
import { useResult } from './reducer';

const LinearProgressWrapper = styled(LinearProgress)(
  ({ theme }) => `
        height: 10px;
        border-radius: 50px;

        &.${linearProgressClasses.colorPrimary} {
            background-color: ${alpha('#00F', 0.1)};
            box-shadow: inset 0 1px 2px ${alpha('#000', 0.2)};
        }
        
        & .${linearProgressClasses.bar} {
          border-radius: 50px;
            background: 'purple';
        }
    `
);

const ResultsCard = () => {
  const { participant, availablePoints, loadingPoints } = useAuth();
  const { result } = useResult();
  const { program } = useProgram();
  return (
    <div className='page-content w-100'>
      <Card>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          divider={<Divider orientation='vertical' flexItem />}
          justifyContent='space-between'
          alignItems='stretch'
          spacing={0}
        >
          <Box p={2} flexGrow={1}>
            <Box>
              <Typography variant='h4' textAlign='center'>
                <b>¡Hola {participant?.firstName}!</b>
              </Typography>
              <h6
                style={{
                  textAlign: 'center',
                  margin: '0 auto',
                  color: '#5d5e5e',
                }}
              >
                Tienes{' '}
                {loadingPoints ? (
                  <>
                    <i className='fa fa-spinner fa-spin'></i>
                  </>
                ) : (
                  availablePoints
                )}{' '}
                {program.coinName}
              </h6>
            </Box>
            <Stack
              sx={{
                mt: 2.5,
                textAlign: 'center',
              }}
              direction='row'
              divider={<Divider orientation='vertical' flexItem />}
              justifyContent='space-evenly'
              alignItems='center'
              spacing={2}
            >
              <Box>
                <Typography gutterBottom variant='h5'>
                  Objetivo
                </Typography>
                <Typography variant='h5'>
                  {program.id === 26
                    ? `${result.objective.toFixed(2)} Kilos`
                    : `$${result.objective.toFixed(2)}`}
                </Typography>
              </Box>
              <Box>
                <Typography gutterBottom variant='h5'>
                  {program.id === 26 ? 'Resultado' : 'Tienes'}
                </Typography>
                <Typography variant='h5'>
                  {program.id === 26
                    ? `${result.obtained.toFixed(2)} Kilos`
                    : `$${result.obtained.toFixed(2)}`}
                </Typography>
              </Box>
              <Box>
                <Typography gutterBottom variant='h5'>
                  Te Falta
                </Typography>
                <Typography variant='h5'>
                  {program.id === 26
                    ? `${result.remaining.toFixed(2)} Kilos`
                    : `$${result.remaining.toFixed(2)}`}
                </Typography>
              </Box>
            </Stack>
          </Box>
          <Box p={2} flexGrow={1}>
            <Typography variant='h5' textAlign='center'>
              Tu Avance
            </Typography>
            <Box
              display='flex'
              sx={{
                pt: 2.5,
              }}
              alignItems='center'
              justifyContent='space-between'
            >
              <Typography variant='h5'>{result.name}</Typography>
              <Typography variant='h6' fontWeight='bold' color='text.primary'>
                {result.percentage.toFixed(2)}%
              </Typography>
            </Box>
            <LinearProgressWrapper
              sx={{
                my: 0.5,
              }}
              variant='determinate'
              value={result.percentage > 100 ? 100 : result.percentage}
            />
            <Box
              display='flex'
              alignItems='center'
              justifyContent='space-between'
            >
              <Typography variant='h6'>0</Typography>
              <Typography variant='h6' fontWeight='bold' color='text.primary'>
                100%
              </Typography>
            </Box>
          </Box>
        </Stack>
      </Card>
    </div>
  );
};

export default ResultsCard;
