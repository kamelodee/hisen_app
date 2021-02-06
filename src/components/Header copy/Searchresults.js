import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useHistory } from "react-router-dom";
import Utils from "../../Utils";

const Searchresults = ({
  ClearAll,
  data,
  pagination,
  setpagination,
  getProducts,
  placeholderImage,
  SetShowResultSection,
}) => {
  const history = useHistory();
  return (
    <Box
      component={Paper}
      position="absolute"
      top={53}
      height="calc(100vh - 64px)"
      right={10}
      left={10}
      overflow="hidden"
    >
      <Box display="flex" height="100%" p={1} justifyContent="space-between">
        <Box width="100%" overflow="auto">
          <Box display="flex" flexWrap="wrap" mb={2}>
            {data.map((data, i) => (
              <Box
                key={i}
                component={Paper}
                p={0.5}
                onClick={() => {
                  SetShowResultSection(false);
                  history.push(`/pd/name/${data.productIndexName}`);
                }}
                m={1}
                width="14%"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
              >
                <Box
                  display="flex"
                  style={{
                    cursor: "pointer",
                  }}
                  flexDirection="column"
                  alignItems="center"
                  height="100px"
                  textAlign="center"
                >
                  <LazyLoadImage
                    width="100%"
                    height="100%"
                    style={{
                      objectFit: "contain",
                    }}
                    effect="blur"
                    alt="Logo"
                    src={Utils.GetProductImages(
                      data.productAssetss,
                      placeholderImage
                    )}
                  />
                </Box>
                <Box
                  mx={0.5}
                  my={1}
                  display="flex"
                  flexDirection="column"
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <Typography
                    title={data.brandProductId}
                    variant="body2"
                    style={{
                      margin: "auto",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                      color: "black",
                      fontWeight: 500,
                    }}
                    paragraph
                  >
                    {data.brandProductId}
                  </Typography>
                  <Typography
                    title={data.productShortDescription}
                    variant="caption"
                    style={{
                      margin: "auto",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                      color: "black",
                      fontWeight: 500,
                    }}
                    paragraph
                  >
                    {data.productShortDescription}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Searchresults;
