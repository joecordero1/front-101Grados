import React, { useState, FC } from "react";
import { format, subYears } from "date-fns";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { Box } from "@mui/material";

interface selectorYearProps {
  selectedYear: string;
  setSelectedYear: (data: any) => void;
}

const selectorYear: FC<selectorYearProps> = ({
  selectedYear,
  setSelectedYear,
}) => {
  const currentYear = parseInt(format(new Date(), "yyyy"), 10);

  const years = Array.from({ length: currentYear - 2017 }, (_, index) => {
    const year = format(subYears(new Date(), index), "yyyy");
    if (index === 0) {
      return { value: year, label: "Año actual" };
    } else if (index === 1) {
      return { value: year, label: "Año anterior" };
    } else {
      return { value: year, label: "" };
    }
  });

  years.push({ value: "Todos los años", label: "Todos los años" });

  const handleChange = (event) => {
    setSelectedYear(event.target.value);
  };
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="year-select-label">Año</InputLabel>
        <Select
          labelId="year-select-label"
          id="year-select"
          value={selectedYear}
          label="year"
          onChange={handleChange}
        >
          {years.map((year) => (
            <MenuItem key={year.value} value={year.value}>
              {year.label ? year.label : year.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default selectorYear;
