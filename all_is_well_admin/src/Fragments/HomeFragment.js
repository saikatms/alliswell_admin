import React, { Component } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {
  Avatar,
  Backdrop,
  Button,
  CircularProgress,
  Container,
  Dialog,
  Divider,
  Fab,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Slide,
  TextField,
  Toolbar,
} from "@material-ui/core";
import BannerSlider from "../components/BannerSlider";
import ProductView from "../components/ProductView";
import HorizontalScroller from "../components/HorizontalScroller";
import StripAddView from "../components/StripAddView";
import GridView from "../components/GridView";
import { loadCategories } from "../components/Actions/categoryActions";
import { connect } from "react-redux";
import { Close, FormatColorFill, Home } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

import { loadCategoryPage } from "../components/Actions/categoryPageActions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export class HomeFragment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Page: "HOME",
      loading: true,
      value: 0,
      addDialog: false,
      images: [],
      colors: [],
      view_type: 0,
    };
  }
  handleChange = (event, newValue) => {
    this.setState({
      value: newValue,
    });
  };

  onFieldChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  removeImage = (index) => {
    let images = this.state.images;
    let colors = this.state.colors;
    images.splice(index, 1);
    colors.splice(index, 1);
    this.setState({
      images,
      colors,
    });
  };

  componentDidMount() {
    if (this.props.categories === null) {
      this.props.loadCategories(
        () => {
          //success
          //   this.setState({ page: "HOME" });
          //   this.props.loadPage(this.state.page);
          this.props.loadPage("HOME", () => {
            this.setState({ loading: false });
          });
        },
        () => {
          //error
          this.setState({ loading: false });
        },
        () => {
          this.setState({ loading: false });

          //error
        }
      );
    }
  }
  render() {
    return (
      <div>
        <Container maxWidth="md" fixed>
          <AppBar position="static" color="white">
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              {this.props.categories
                ? this.props.categories.map((category) => (
                    <Tab
                      icon={
                        <CategoryTab
                          icon={category.icon}
                          title={category.categoryName}
                        />
                      }
                      //Onclick change the category page name...Default name set to "HOME"
                      onClick={(e) => {
                        if (
                          this.props.categoryPages[
                            category.categoryName.toUpperCase()
                          ]
                        ) {
                          this.setState({
                            Page: category.categoryName.toUpperCase(),
                          });
                        } else {
                          this.setState({ loading: true });
                          this.props.loadPage(
                            category.categoryName.toUpperCase(),
                            () => {
                              this.setState({
                                loading: false,
                                Page: category.categoryName.toUpperCase(),
                              });
                            },
                            () => {
                              //error
                              this.setState({ loading: false });
                            }
                          );
                        }
                      }}
                    />
                  ))
                : null}
            </Tabs>
          </AppBar>

          {this.props.categoryPages
            ? this.props.categoryPages[this.state.Page].map((item, index) => {
                switch (item.view_type) {
                  case 0:
                    let banners = [];
                    for (let index = 1; index <= item.no_of_banners; index++) {
                      const banner = item["banner_" + index];
                      const background =
                        item["banner_" + index + "_background"];

                      banners.push({ banner, background });
                    }
                    return <BannerSlider Images={banners} />;
                  case 1:
                    return (
                      <StripAddView
                        image={item.strip_ad_banner}
                        background={item.background}
                      />
                    );

                  case 2:
                    let products = [];
                    for (let index = 1; index <= item.no_of_products; index++) {
                      let data = {};
                      data["title"] = item["product_title_" + index];
                      data["subtitle"] = item["product_subtitle_" + index];
                      data["price"] = item["product_price_" + index];
                      data["image"] = item["product_image_" + index];
                      products.push(data);
                      // console.log(products);
                    }
                    return (
                      <HorizontalScroller
                        products={products}
                        title={item.layout_title}
                        background={item.layout_background}
                      />
                    );
                  // case 3:
                  //   let gridproducts = [];
                  //   for (let index = 1; index < 5; index++) {
                  //     let data = {};
                  //     data["title"] = item["product_title_" + index];
                  //     data["subtitle"] = item["product_subtitle_" + index];
                  //     data["price"] = item["product_price_" + index];
                  //     data["image"] = item["product_image_" + index];
                  //     gridproducts.push(data);
                  //     console.log(gridproducts);
                  //   }
                  //   return (
                  //     <GridView
                  //       products={gridproducts}
                  //       title={item.layout_title}
                  //       background={item.layout_background}
                  //     />
                  //   );

                  default:
                    break;
                }
              })
            : null}
          {/* {console.log(this.props.categoryPages)} */}
          {/* <BannerSlider Images={[{ image: "gdskjag" }]} /> */}
          {/* <HorizontalScroller /> */}
          {/* <StripAddView />*/}

          <Fab
            color="primary"
            aria-label="add"
            style={{ position: "fixed", bottom: "50px", right: "50px" }}
            onClick={(e) => this.setState({ addDialog: true })}
          >
            <AddIcon />
          </Fab>
        </Container>

        {/* Dialog bar  */}
        <Dialog
          fullScreen
          open={this.state.addDialog}
          onClose={(e) =>
            this.setState({
              addDialog: false,
            })
          }
          TransitionComponent={Transition}
        >
          <AppBar>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={(e) => {
                  this.setState({
                    addDialog: false,
                  });
                }}
                aria-label="close"
              >
                <Close />
              </IconButton>
              <Typography variant="h6">Add Products</Typography>
              <Button
                autoFocus
                color="inherit"
                style={{ position: "absolute" }}
                onClick={(e) => {
                  this.setState({
                    addDialog: false,
                  });
                }}
              >
                save
              </Button>
            </Toolbar>
          </AppBar>
          <Toolbar />
          <Box padding="16px">
            <FormControl>
              <InputLabel id="demo-simple-select-label">View Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={0}
                onChange={this.onFieldChange}
                name="view_type"
              >
                <MenuItem value={0}>BANNER SLIDER</MenuItem>
                <MenuItem value={1}>STRIP AD</MenuItem>
                <MenuItem value={2}>HORIZONTAL SCROLLER</MenuItem>
              </Select>
              <TextField
                label="Size"
                id="outlined-size-small"
                variant="outlined"
                type="number"
                size="small"
                margin="dense"
                name="position"
                onChange={this.onFieldChange}
              />
              <Box display="flex" flexWrap="true">
                {this.state.images &&
                  this.state.images.map((item, index) => (
                    <Box margin="15px" border={1}>
                      <img
                        src={URL.createObjectURL(item)}
                        style={{
                          height: "100px",
                          width:
                            this.state.view_type === 0
                              ? "160px"
                              : this.state.view_type === 1
                              ? "210px"
                              : 0,
                          //   objectFit="scale-down",
                          backgroundColor: this.state.colors[index],
                        }}
                      />
                      <br />
                      <input
                        id={"contained-button-" + index}
                        type="color"
                        hidden
                        onChange={(e) => {
                          let colors = this.state.colors;
                          colors[index] = e.target.value;
                        }}
                        defaultValue="#000000"
                      />
                      <IconButton
                        aria-label="delete"
                        onClick={(e) => this.removeImage(index)}
                      >
                        <DeleteIcon />
                      </IconButton>

                      <label htmlFor={"contained-button-" + index}>
                        <IconButton
                          color="primary"
                          aria-label=""
                          component="span"
                        >
                          <FormatColorFill />
                        </IconButton>
                      </label>
                    </Box>
                  ))}
              </Box>
              <input
                accept="image/*"
                id="contained-button-file"
                hidden
                type="file"
                name="images"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    let images = this.state.images;
                    images.push(e.target.files[0]);
                    this.setState({
                      images,
                    });
                  }
                }}
              />
              {/* {this.state.images.length > 3 ? ( */}

              {this.state.view_type === 0 && this.state.images.length < 3 ? (
                <label htmlFor="contained-button-file">
                  <Button variant="contained" color="primary" component="span">
                    Add Image
                  </Button>
                </label>
              ) : null}
              {this.state.view_type === 1 && this.state.images.length < 3 ? (
                <label htmlFor="contained-button-file">
                  <Button variant="contained" color="primary" component="span">
                    Add Image
                  </Button>
                </label>
              ) : null}
              <Box style={{ backgroundColor: this.state.layout_background }}>
                <TextField id="filled-basic" label="Title" variant="filled" />
              </Box>

              <input
                id={"contained-button-title"}
                type="color"
                hidden
                onChange={this.onFieldChange}
                name="layout_bg"
                defaultValue="#ffffff"
              />
              <label htmlFor={"contained-button-title"}>
                <IconButton color="primary" aria-label="" component="span">
                  <FormatColorFill />
                </IconButton>
              </label>
            </FormControl>
          </Box>
        </Dialog>
        <Backdrop style={{ zIndex: 1 }} open={this.state.loading}>
          <CircularProgress color="primary" />
        </Backdrop>
      </div>
    );
  }
}

export const CategoryTab = ({ icon, title }) => {
  return (
    <Box textAlign="center">
      {/* {icon ? <img src={icon} /> : <Home />} */}
      <Typography variant="body2">{title}</Typography>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    categoryPages: state.categoryPages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCategories: (onSuccess, onError) =>
      dispatch(loadCategories(onSuccess, onError)),
    loadPage: (category, onSuccess, onError) =>
      dispatch(loadCategoryPage(category, onSuccess, onError)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeFragment);
