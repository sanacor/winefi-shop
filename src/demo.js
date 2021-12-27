import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import MaterialTable from "material-table";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


export default function MaterialTableDemo() {
  const [show, setShow] = React.useState(false);
  const value = { show, setShow };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [selectedRowNumber, setSelectedRowNumber] = React.useState(0);

  const [selectedInquiry, setSelectedInquiry] = React.useState({});

  // modal end

  const [state, setState] = React.useState({ hits: [] });
  React.useEffect(async () => {
    const result = await axios.get("http://demo3440516.mockable.io/inquiry");
    setState(result.data);
  }, []);

  async function farBoo() {
    console.log("farBoo 1");
    const result = await axios.post("http://demo3440516.mockable.io/reply", {
      replyContent: selectedInquiry.inquiryContents,
    });

    console.log("farBoo 2");
    handleClose();

    const result2 = await axios.get("http://demo3440516.mockable.io/inquiry");
    setState(result2.data);
  }

  return (
    <React.Fragment>
      <MaterialTable
        title="문의 리스트"
        columns={state.columns}
        data={state.data}
        actions={[
          {
            icon: "search",
            tooltip: "문의 자세히 보기",
            onClick: (event, rowData) => {
              setSelectedRowNumber(rowData.tableData.id);
              setSelectedInquiry(rowData);
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
      />
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedInquiry.wineName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>문의 내용</Form.Label>
            <Form.Control
              type="text"
              placeholder={selectedInquiry.inquiryContents}
              readOnly
            />
            <Container className="mt-5">
              <Row>
                <Col></Col>
              </Row>
            </Container>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>답변 작성</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="문의를 보낸 손님에게 답변을 해주세요:)"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="primary" onClick={farBoo}>
            답변 보내기
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}
