import { Alert, AlertTitle } from "@mui/material";

type TProps = {
  massage: string;
};

export default function ErrorPage({ massage }: TProps) {
  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      {massage}
    </Alert>
  );
}
