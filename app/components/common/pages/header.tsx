import { AppBar, Typography } from "@mui/material";

type TProps = {
  title: string;
};

export default function Header({ title }: TProps) {
  return (
    <AppBar position="static">
      <Typography variant="h6" m={1.5}>
        {title}
      </Typography>
    </AppBar>
  );
}
