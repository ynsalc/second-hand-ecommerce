import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

const CustomModal = ({
  modal,
  setModal,
  title,
  children,
  btnFirst,
  btnSecond,
}) => {
  return (
    <>
      <Modal
        isCentered
        onClose={setModal}
        isOpen={modal}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={setModal}>
              {btnFirst}
            </Button>
            <Button variant="ghost">{btnSecond}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomModal;
