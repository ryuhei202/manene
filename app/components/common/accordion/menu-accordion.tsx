"use client";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";

type TProps = {
  title: string;
  children: React.ReactNode;
};

export default function MenuAccordion({ title, children }: TProps) {
  const theme = useTheme();
  return (
    <>
      <Accordion defaultExpanded={true} disableGutters={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="menu-content"
          id="menu-header"
          sx={{ backgroundColor: theme.palette.secondary.main }}
        >
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>{children}</AccordionDetails>
      </Accordion>
    </>
  );
}
