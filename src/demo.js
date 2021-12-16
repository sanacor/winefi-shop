import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import MaterialTable from "material-table";
import axios from "axios";

import InquiryPopup from "./component/InquiryModal";

export default function MaterialTableDemo() {
  // const [state, setState] = React.useState({
  // columns: [
  //   { title: 'Name', field: 'name' },
  //   { title: 'Surname', field: 'surname' },
  //   { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
  //   {
  //     title: 'Birth Place',
  //     field: 'birthCity',
  //     lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
  //   },
  // ],
  // data: [
  //   { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
  //   {
  //     name: 'Zerya Betül',
  //     surname: 'Baran',
  //     birthYear: 2017,
  //     birthCity: 34,
  //   },
  // ],
  // });

  // modal start

  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 
  // modal end

  const [state, setState] = React.useState({ hits: [] });
  React.useEffect(async () => {
    const result = await axios.get("http://demo3440516.mockable.io/inquiry");
    setState(result.data);
  }, []);

  return (
    <>
      <MaterialTable
        title="문의 리스트"
        columns={state.columns}
        data={state.data}
        actions={[
          {
            icon: "search",
            tooltip: "문의 자세히 보기",
            onClick: (event, rowData) => {
              // Do save operation
              console.log("onClick: 문의 자세히 보기");
              handleShow();
            },
          },
          {
            icon: "edit",
            tooltip: "답변 하기",
            onClick: (event, rowData) => {
              // Do save operation
              alert("Hi 답변 하기");
            },
          },
        ]}
        localization={{
          header: {
            actions: "기능",
          },
        }}
        // editable={{
        //   // isEditable: rowData => rowData.name === 'replyContents', // only name(a) rows would be editable
        //   onRowAdd: (newData) =>
        //     new Promise((resolve) => {
        //       setTimeout(() => {
        //         resolve();
        //         const data = [...state.data];
        //         data.push(newData);
        //         setState({ ...state, data });
        //       }, 600);
        //     }),
        //   onRowUpdate: (newData, oldData) =>
        //     new Promise((resolve) => {
        //       setTimeout(() => {
        //         resolve();
        //         const data = [...state.data];
        //         data[data.indexOf(oldData)] = newData;
        //         setState({ ...state, data });
        //       }, 600);
        //     }),
        //   // onRowDelete: oldData =>
        //   //   new Promise(resolve => {
        //   //     setTimeout(() => {
        //   //       resolve();
        //   //       const data = [...state.data];
        //   //       data.splice(data.indexOf(oldData), 1);
        //   //       setState({ ...state, data });
        //   //     }, 600);
        //   //   }),
        // }}
      />
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Don't even try to press
          escape key.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
