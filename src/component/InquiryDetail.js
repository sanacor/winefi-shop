import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import selecttedModal from "../context/SelectedModal"

function InquiryDetailModal(props) {
  const [show, setShow] = React.useState(props.show);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const view = useContext(selecttedModal);

  console.log(props.inquiryList); 
  console.log(props.selectedRowNumber); 

//   if(props.show) {
//     handleShow();
//   }
//   else {
//       handleClose();
//   }

  return (
    <Modal show={view} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        I will not close if you click outside me. Don't even try to press escape
        key zzz.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary">Understood</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default InquiryDetailModal;
