import CreateGroup from "~/components/partials/participant/createGroup";
import { withAuth } from "components/AuthGuard";

const CreatePdv = () => {
  return (
    <div>
      <CreateGroup />
    </div>
  );
};

export default withAuth(CreatePdv);
