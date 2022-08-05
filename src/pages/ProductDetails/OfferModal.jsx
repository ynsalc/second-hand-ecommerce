import React, { useState, useEffect } from "react";
import CustomModal from "components/Modal/Modal";
import {
  Box,
  Radio,
  RadioGroup,
  Stack,
  Alert,
  Flex,
  Image,
  Text,
  Spacer,
  Input,
} from "@chakra-ui/react";
import { fetchOneProduct } from "services/service";

const OfferModal = ({ modal, setModal, productId }) => {
  const [oneProduct, setOneProduct] = useState({});
  const [percent, setPercent] = useState(null);
  const [inpPercent, setInpPercent] = useState();

  useEffect(() => {
    fetchOneProduct(productId).then((res) => setOneProduct(res.data));
  }, [productId]);

  const handleChange = (e) => {
    setPercent(e.target.name);
  };

  const handleChangeInput = (e) => {
    setInpPercent(e.target.value);
    setPercent(null);
  };

  const btnSecond = percent
    ? `${percent} TL Onayla`
    : inpPercent
    ? `${inpPercent} TL Onayla`
    : "Teklif Ver";

  return (
    <div>
      <CustomModal
        modal={modal}
        setModal={setModal}
        title="Teklif Ver"
        btnFirst="Vazgeç"
        btnSecond={btnSecond}
      >
        <>
          <Alert status="info" mb={5} rounded="lg" p={2}>
            <Box>
              <Flex alignItems="center">
                <Image
                  src={`https://bootcamp.akbolat.net/${oneProduct.image?.url}`}
                  style={{
                    height: "3.6rem",
                    objectFit: "cover",
                    width: "3.6rem",
                  }}
                  rounded="lg"
                  mr={2}
                />
                <Text>{oneProduct.name}</Text>
              </Flex>
            </Box>
            <Spacer />
            <Box justifyContent="flex-end">
              <Text fontWeight="bold">${oneProduct.price}</Text>
            </Box>
          </Alert>
          <RadioGroup>
            <Stack>
              <Box border="1px" borderColor="gray.200" p={2} borderRadius={8}>
                <Radio
                  value="1"
                  name={oneProduct.price * 0.2}
                  onChange={handleChange}
                  isDisabled={inpPercent ? true : false}
                >
                  %20'si kadar teklif ver
                </Radio>
              </Box>
              <Box border="1px" borderColor="gray.200" p={2} borderRadius={8}>
                <Radio
                  value="2"
                  name={oneProduct.price * 0.3}
                  onChange={handleChange}
                  isDisabled={inpPercent ? true : false}
                >
                  %30'u kadar teklif ver
                </Radio>
              </Box>
              <Box border="1px" borderColor="gray.200" p={2} borderRadius={8}>
                <Radio
                  value="3"
                  name={oneProduct.price * 0.4}
                  onChange={handleChange}
                  isDisabled={inpPercent ? true : false}
                >
                  %40'ı kadar teklif ver
                </Radio>
              </Box>
            </Stack>
          </RadioGroup>
          <Input
            onChange={handleChangeInput}
            id="customPrice"
            placeholder="Teklif Belirle"
            backgroundColor="gray.300"
            value={inpPercent}
            mt={3}
          />
        </>
      </CustomModal>
    </div>
  );
};

export default OfferModal;
