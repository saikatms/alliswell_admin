import { Box } from "@material-ui/core";
import React from "react";

const StripAddView = ({ image, background }) => {
  return (
    <Box>
      <img
        style={{
          height: "100px",
          width: "100%",
          background: background,
          objectFit: "scale-down",
        }}
        src={image}
      />
    </Box>
  );
};

export default StripAddView;
