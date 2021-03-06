import { grey } from "@material-ui/core/colors";
import { useTheme } from "@material-ui/core/styles";
import React from "react";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const BannerSlider = (props) => {
  const theme = useTheme();

  const [activeStep, setActiveStep] = React.useState(0);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {props.Images.map((step, index) => (
          <div
            key={index}
            style={{
              width: "100%",
              height: "350px",
              //   backgroundColor: grey[400],
            }}
          >
            {Math.abs(activeStep - index) <= 2 ? (
              <img
                src={step}
                alt=""
                style={{
                  width: "100%",
                  height: "250px",
                  objectFit: "scale-down",
                  backgroundColor: step.backgroundColor,
                }}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
    </div>
  );
};

export default BannerSlider;
