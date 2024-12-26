import React from "react";
import GamesHome from "~/components/features/games";
import { withAuth } from "components/AuthGuard";
const Games = () => {
  return (
    <>
      <GamesHome />
    </>
  );
};

export default withAuth(Games);
