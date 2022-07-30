import React, { useState } from "react";
import useFetchProducts from "../../hooks/useFetchProducts";
import useFetchCategories from "hooks/useFetchCategories";
import {
  Grid,
  Spinner,
  Container,
  GridItem,
  SimpleGrid,
  useColorModeValue,
  Flex,
  Box,
  Link,
} from "@chakra-ui/react";
import Product from "../../components/Product/Index";
import "./Index.scss";

const NavItem = ({ children, id, setId }) => {
  const handleClick = () => {
    setId(id);
  };
  return (
    <Link
      onClick={handleClick}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "#1DA1F2",
          color: "white",
        }}
      >
        {children}
      </Flex>
    </Link>
  );
};

const Index = ({ sidebar }) => {
  const { data, loading } = useFetchProducts();
  const { data: categories, loading: loadingCategory } = useFetchCategories();
  const [currentCategoryId, setCurrentCategoryId] = useState(0);
  const bgColor = useColorModeValue("white", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const currentCategoryProducts = data.filter(
    (item) => item.category.id === currentCategoryId
  );

  return (
    <div>
      <Container maxW="6xl" centerContent>
        <Grid templateColumns="repeat(5, 1fr)">
          {sidebar && (
            <GridItem colSpan={1} mt={12}>
              <Box
                bg={bgColor}
                borderRight="1px"
                borderRightColor={borderColor}
                w={{ base: "full", md: 60 }}
                h="full"
              >
                {loadingCategory && (
                  <Spinner justifyContent="center" m="0 auto" />
                )}
                <NavItem id={0} setId={setCurrentCategoryId}>
                  Tüm Ürünler
                </NavItem>
                {categories.map((category) => (
                  <NavItem
                    key={category.id}
                    id={category.id}
                    setId={setCurrentCategoryId}
                  >
                    {category.name}
                  </NavItem>
                ))}
              </Box>
            </GridItem>
          )}
          <GridItem colSpan={`${sidebar ? 4 : 5}`}>
            {loading && <Spinner mt={5} justifyContent="center" m="0 auto" />}
            <SimpleGrid columns={`${sidebar ? 3 : 3}`}>
              {currentCategoryId !== 0 &&
                currentCategoryProducts.map((product) => (
                  <Product key={product.id} product={product} />
                ))}
              {currentCategoryId === 0 &&
                data.map((product) => (
                  <Product key={product.id} product={product} />
                ))}
            </SimpleGrid>
          </GridItem>
        </Grid>
      </Container>
    </div>
  );
};

export default Index;
