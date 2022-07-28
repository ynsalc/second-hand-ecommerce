import React from "react";
import useFetchProducts from "../../hooks/useFetchProducts";
import {
  Flex,
  Grid,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import Product from "../../components/Product/Index";
import "./Index.scss";

const Index = () => {
  const { data, loading, error } = useFetchProducts();

  return (
    <div>
      <Flex direction="column" justifyContent="center" maxW={"8xl"} m="0 auto">
        <Grid
          gridGap="6"
          gridTemplateColumns="repeat( auto-fit, minmax(340px, 1fr) )"
          paddingTop={5}
        >
          {loading && <Spinner mt={5} justifyContent="center" m="0 auto" />}
          {data.map((product) => (
            <Product key={product.id} product={product} />
          ))}
          {error && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>Your browser is outdated!</AlertTitle>
              <AlertDescription>
                Your Chakra experience may be degraded.
              </AlertDescription>
            </Alert>
          )}
        </Grid>
      </Flex>
    </div>
  );
};

export default Index;
