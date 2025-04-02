import React from 'react';
import { withAuth } from '~/components/AuthGuard';
import RenderTriviaForm from '~/components/partials/trivias/renderTriviaForm';

const TriviaScreen = () => {
  return <RenderTriviaForm />;
};

export default withAuth(TriviaScreen);
