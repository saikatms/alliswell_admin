import { Box, Typography } from "@material-ui/core";
import React from "react";
import ProductView from "./ProductView";

const GridView = (props) => {
  return (
    <Box
      width="400px"
      style={{ background: props.background }}
      p="16px"
      mx="auto"
    >
      <Typography variant="h5">{props.title}</Typography>
      <Box display="flex" p="16px" justifyContent="center">
        <ProductView items={props.products[0]} />
        <ProductView items={props.products[1]} />
      </Box>
      <Typography variant="h5">Title</Typography>
      <Box display="flex" p="16px" justifyContent="center">
        <ProductView items={props.products[2]} />
        <ProductView items={props.products[3]} />
      </Box>
    </Box>
  );
};

export default GridView;
