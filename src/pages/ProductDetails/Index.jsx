import React from "react";
import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
  SkeletonText,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { MdLocalShipping } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import OfferModal from "./OfferModal";
import BuyModal from "./BuyModal";

export default function ProductDetail() {
  const navigate = useNavigate();
  const state = useSelector((state) => state.user);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});
  const [offers, setOffers] = useState([]);
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [offerModalOpen, setOfferModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`https://bootcamp.akbolat.net/products/${id}`).then((res) => {
      setLoading(false);
      setProduct(res.data);
      setOffers(res.data.offers);
    });
  }, [id]);

  let givenOffer;

  offers.map((item) => {
    if (
      item.users_permissions_user === Number(state ? state?.user?.id : null)
    ) {
      givenOffer = item;
    } else {
      return null;
    }
  });

  const btnColorMode = useColorModeValue("white", "gray.900");

  const handleBuyClick = () => {
    if (state) {
      setBuyModalOpen(true);
    } else {
      navigate("/sign-in");
    }
  };

  const handleOfferClick = () => {
    if (state) {
      setOfferModalOpen(true);
    } else {
      navigate("/sign-in");
    }
  };

  return (
    <Container maxW={"7xl"}>
      {loading && (
        <>
          <Box padding="6" boxShadow="lg" bg="white">
            <SkeletonText mt="4" noOfLines={100} spacing="4" />
          </Box>
        </>
      )}
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Image
            rounded={"md"}
            alt={"product image"}
            src={`https://bootcamp.akbolat.net${product?.image?.url}`}
            fit={"cover"}
            align={"center"}
            w={"100%"}
            h={{ base: "100%", sm: "800px", lg: "1000px" }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {product?.name}
            </Heading>
            <Text
              color={useColorModeValue("gray.900", "gray.400")}
              fontWeight={300}
              fontSize={"2xl"}
            >
              ${product?.price} USD
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
                mt={1}
                mb={1}
              />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                color={useColorModeValue("gray.500", "gray.400")}
                fontSize={"2xl"}
                fontWeight={"300"}
              >
                {product?.status}
              </Text>
              <Text fontSize={"lg"}>{product?.description}</Text>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"2"}
              >
                Kategori: {product?.category?.name}
              </Text>
            </Box>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Ürün Detayı
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Marka:
                  </Text>{" "}
                  {product?.brand}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Renk:
                  </Text>{" "}
                  {product?.color}
                </ListItem>
              </List>
            </Box>
          </Stack>

          <Button
            rounded={"none"}
            w={"full"}
            disabled={product.isSold}
            mt={2}
            size={"lg"}
            onClick={handleBuyClick}
            py={"7"}
            colorScheme="twitter"
            color={btnColorMode}
            textTransform={"uppercase"}
            _hover={{
              transform: "translateY(2px)",
              boxShadow: "lg",
            }}
          >
            {product.isSold ? "Bu ürün satışta değil" : "Sepete Ekle"}
          </Button>

          <BuyModal
            modal={buyModalOpen}
            setModal={() => setBuyModalOpen(!buyModalOpen)}
            productId={product.id}
          />

          {product.isOfferable && !givenOffer && !product.isSold && (
            <>
              <Button
                rounded={"none"}
                w={"full"}
                disabled={product.isSold}
                mt={2}
                size={"lg"}
                onClick={handleOfferClick}
                py={"7"}
                colorScheme="twitter"
                color={btnColorMode}
                textTransform={"uppercase"}
                _hover={{
                  transform: "translateY(2px)",
                  boxShadow: "lg",
                }}
              >
                Teklif Ver
              </Button>

              <OfferModal
                modal={offerModalOpen}
                setModal={() => setOfferModalOpen(!offerModalOpen)}
                productId={product.id}
              />
            </>
          )}

          <Stack direction="row" alignItems="center" justifyContent={"center"}>
            <MdLocalShipping />
            <Text>2-3 iş günü içerisinde kargo!</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
