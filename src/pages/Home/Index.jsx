import React from "react";
import Products from "../Products/Index";
import { Container, chakra } from "@chakra-ui/react";
import Features from "../../components/Features/Index";

const Index = () => {
  return (
    <Container maxW="8xl" mt={2}>
      <img src="https://i.hizliresim.com/2ywnoxp.png" alt="Banner" />
      <Features />
      <chakra.h1
        textAlign={'center'}
        fontSize={'4xl'}
        mt={10}
        fontWeight={'bold'}>Popular Products</chakra.h1>
      <Products />
    </Container>
  );
};

export default Index;
