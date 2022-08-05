import React from "react";
import CustomModal from "components/Modal/Modal";

const BuyModal = ({ modal, setModal, productId }) => {
  return (
    <div>
      <CustomModal
        modal={modal}
        setModal={setModal}
        title="Satın Al"
        btnFirst="Vazgeç"
        btnSecond="Satın Al"
      >
        <p>Satın almak istiyor musunuz ?</p>
      </CustomModal>
    </div>
  );
};

export default BuyModal;
