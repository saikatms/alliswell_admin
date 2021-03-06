import { Box, Typography } from "@material-ui/core";
import React from "react";
import ProductView from "./ProductView";

const HorizontalScroller = (props) => {
  // console.log(props);
  return (
    <Box style={{ background: props.background }} padding="20px">
      <Typography variant="h5">{props.title}</Typography>
      <Box display="flex" overflow="auto">
        {props.products.map((item, index) => (
          <ProductView item={item} />
        ))}
      </Box>
    </Box>
  );
};

export default HorizontalScroller;
