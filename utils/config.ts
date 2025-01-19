export const config = {
  server: {
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
  },
  headers: {
    WORKSPACE_HEADER: 'x-workspace-id',
    PROGRAM_HEADER: 'x-program-id',
  },
  program: {
    id: process.env.NEXT_PUBLIC_PROGRAM_ID,
  },
};
