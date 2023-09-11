"use client";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import React from "react";

type TProps = {
  title: string;
  children: React.ReactNode;
};

export default function MenuAccordion({ title, children }: TProps) {
  return (
    <>
      <Accordion defaultExpanded={true} disableGutters={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="menu-content"
          id="menu-header"
          sx={{ backgroundColor: "secondary.main" }}
        >
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>{children}</AccordionDetails>
      </Accordion>
    </>
  );
}
