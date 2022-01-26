import React, { useEffect } from "react";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import parseJwt from "../helpers/JWTParser";


import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import MaterialTable from "material-table";
import axios from "axios";



function Profile(props) {
  const { user } = useSelector((state) => state.loginSlice );
  const [info1, info2] = parseJwt(user.access_token);
  console.log(info1, info2);


  ///
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 
  // modal end

  const [state, setState] = React.useState({ hits: [] });
  React.useEffect(async () => {
    const result = await axios.get("http://demo3440516.mockable.io/inquiry");
    setState(result.data);
  }, []);
  ///
  if (!user) {
    return <Redirect to="/login" />;
  }
  
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
  /*
  return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Token:</strong> {currentUser.access_token.substring(0, 20)} ...{" "}
          {currentUser.access_token.substr(currentUser.access_token.length - 20)}
        </p>
        <p>
          <strong>Id:</strong> {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
        <strong>Authorities:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
      </div>
    );
    */
}

export default Profile;