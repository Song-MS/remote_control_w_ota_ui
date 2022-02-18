/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useState, useEffect} from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import Axios from "axios";

const sample = [
  {
    model: 'M30',
    category: 'Controller',
    version: '2.2',
    filename: 'file1',
    createdBy: 'member1',
    createdAt: '2022-02-16 15:09'
  },
  {
    model: 'M20',
    category: 'Controller',
    version: '3.1',
    filename: 'file2',
    createdBy: 'member2',
    createdAt: '2022-02-16 15:09'
  },
  {
    model: 'M10',
    category: 'Controller',
    version: '2.1',
    filename: 'file3',
    createdBy: 'member1',
    createdAt: '2022-02-16 15:09'
  },
  {
    model: 'M20',
    category: 'DB Manager',
    version: '0.5',
    filename: 'file4',
    createdBy: 'member2',
    createdAt: '2022-02-16 15:09'
  },
  {
    model: 'M30',
    category: 'Bridge',
    version: '1.1',
    filename: 'file5',
    createdBy: 'member2',
    createdAt: '2022-02-16 15:09'
  },
]

const category = [
  {
    id: 1,
    name: 'Model',
    data: 'model'
  },
  {
    id: 2,
    name: 'Software',
    data: 'category'
  },
  {
    id: 3,
    name: 'Filename',
    data: 'filename'
  }
]

const softwareType = [
  {
    id: 1,
    name: 'Controller',
    data: 'CONTROLLER'
  },
  {
    id: 2,
    name: 'DB Manager',
    data: 'DB_MANAGER'
  },
  {
    id: 3,
    name: 'Bridge',
    data: 'BRIDGE'
  }
]

const useInput = (initialState) => {
  const [value, setValue] = useState(initialState)

  const onChange = e => {
    setValue(e.target.value)
  }

  return {value, onChange}
}

function AddSoftware({closeModal}) {
  const [file, setFile] = useState()
  const [error, setError] = useState({})
  const model = useInput(1)
  const software = useInput('CONTROLLER')
  const version = useInput('')

  const handleChangeFile = e => {
    const file = e.target.files[0]
    if (file.type !== 'application/x-tar') {
      setError({
        ...error,
        file: true
      })
      return
    }
    setError({
      ...error,
      file: false
    })
    setFile(file)
  }

  const handleAddSoftware = e => {
    e.preventDefault()

    const postData = {
      model: model.value,
      category: software.value,
      version: version.value,
      file: file
    }

    const isInvalid = validateData(postData)
    if (!isInvalid) {
      // software 등록 api 호출

    }
  }

  const validateData = (data) => {
    let invalid = {}
    const regex = /^[0-9]*\.[0-9]*\.[0-9]*$/
    if (!regex.test(data.version)) {
      invalid.version = true
    }
    if (!data.file) {
      invalid.file = true
    }
    setError(invalid)
    return Object.values(invalid).includes(true)
  }

  return (
    <Form>
      <Row>
        <Col>
          <FormGroup className="mb-2">
            <label
              className="form-control-label"
              htmlFor="select-model"
            >
              Robot Model
            </label>
            <Input
              bsSize="sm"
              id="select-model"
              name="model"
              type="select"
              value={model.value}
              onChange={model.onChange}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup className="mb-2">
            <label
              className="form-control-label"
              htmlFor="select-software"
            >
              Software Name
            </label>
            <Input
              bsSize="sm"
              id="select-software"
              name="category"
              type="select"
              value={software.value}
              onChange={software.onChange}
            >
              {
                softwareType.map(item => (
                  <option key={item.id} value={item.data}>{item.name}</option>
                ))
              }
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup className="mb-2 d-flex flex-column">
            <label
              className="form-control-label"
            >
              File Name
            </label>
            <div
              className={`form-control form-control-sm d-flex justify-content-between ${error.file && 'is-invalid'}`}>
              <div className="text-truncate pr-2">
                {file && file.name}
              </div>
              <label
                className="d-inline-block float-right"
              >
                <i className="fas fa-file-upload"/>
                <Input
                  bsSize="sm"
                  name="filename"
                  className="d-none"
                  type="file"
                  accept=".tar"
                  onChange={handleChangeFile}
                />
              </label>
            </div>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup className="mb-2">
            <label
              className="form-control-label"
              htmlFor="input-version"
            >
              Version
            </label>
            <Input
              bsSize="sm"
              id="input-version"
              placeholder="ex) 1.0.1"
              invalid={error.version}
              value={version.value}
              onChange={version.onChange}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row className="mt-2 d-flex justify-content-center">
        <Button
          color="primary"
          onClick={handleAddSoftware}
        >
          Add
        </Button>
        {' '}
        <Button
          onClick={closeModal}
        >
          Cancel
        </Button>
      </Row>
    </Form>
  )
}

function SoftwareContent({data}) {
  return (
    <>
      <Row className="mb-2">
        <Col>
          <label className="form-control-label">
            Robot Model
          </label>
          <Input bsSize="sm" value={data.model} disabled/>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <label className="form-control-label">
            Software Name
          </label>
          <Input bsSize="sm" value={data.category} disabled/>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <label className="form-control-label">
            Version
          </label>
          <Input bsSize="sm" value={data.version} disabled/>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <label className="form-control-label">
            File Name
          </label>
          <Input bsSize="sm" value={data.filename} disabled/>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <label className="form-control-label">
            Created By
          </label>
          <Input bsSize="sm" value={data.createdBy} disabled/>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <label className="form-control-label">
            Created At
          </label>
          <Input bsSize="sm" value={data.createdAt} disabled/>
        </Col>
      </Row>
    </>
  )
}

function RobotSoftware() {
  const [data, setData] = useState([])
  const [modal, setModal] = useState({})
  const [isOpen, setIsOpen] = useState(false)
  const searchType = useInput('model')
  const keyword = useInput('')

  useEffect(() => {
    setData(sample)
  }, [])

  const openAddModal = () => {
    setModal({
      title: 'Add Robot Software',
      content: <AddSoftware closeModal={closeModal}/>,
      footer: false
    })
    setIsOpen(true)
  }

  const openContentModal = (data) => {
    setModal({
      title: `${data.model} Review`,
      content: <SoftwareContent data={data}/>,
      footer: false
    })
    setIsOpen(true)
  }

  const closeModal = e => {
    e.preventDefault()
    setIsOpen(false)
  }

  const submit = e => {
    e.preventDefault()

    const search = {
      [searchType.value]: keyword.value
    }

    // search 키워드 포함 조회 api 호출
  }

  return (
    <>
      <Header/>
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <Col xs="4">
                    <h3 className="mb-0">Robot Software</h3>
                  </Col>
                  <Col className="d-flex justify-content-end">
                    <Form className="form-inline d-none d-md-flex" onSubmit={submit}>
                      <FormGroup className="col-md-12 mb-0">
                        <InputGroup className="input-group-alternative border">
                          <Input
                            bsSize="sm"
                            type="select"
                            className="col-md-4 mt-1 text-black-50 text-truncate"
                            value={searchType.value}
                            onChange={searchType.onChange}
                          >
                            {
                              category.map(item => (
                                <option key={item.id} value={item.data}>{item.name}</option>
                              ))
                            }
                          </Input>
                          <Input
                            bsSize="sm"
                            placeholder="Search"
                            className="pl-3 mt-1 text-black-50"
                            value={keyword.value}
                            onChange={keyword.onChange}
                          />
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fas fa-search text-black-50"/>
                            </InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                      </FormGroup>
                    </Form>
                    <Button
                      color="primary"
                      size="sm"
                      onClick={openAddModal}
                    >
                      Add
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive hover>
                <thead className="thead-light">
                <tr>
                  <th scope="col">Robot Model</th>
                  <th scope="col">Software Name</th>
                  <th scope="col">Version</th>
                  <th scope="col">File Name</th>
                  <th scope="col">Created By</th>
                  <th scope="col">Created At</th>
                </tr>
                </thead>
                <tbody id="UncontrolledPopover">
                {data.map(function (datum, idx) {
                  return (
                    <tr key={`rs-${idx}`} onClick={() => openContentModal(datum)}>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">
                              {datum.model}
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>{datum.category}</td>
                      <td>
                        {datum.version}
                      </td>
                      <td>{datum.filename}</td>
                      <td>
                        {datum.createdBy}
                      </td>
                      <td>
                        {datum.createdAt}
                      </td>
                    </tr>
                  )
                })}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <Row>
                  <Col>
                    <nav aria-label="...">
                      <Pagination
                        className="pagination justify-content-end mb-0"
                        listClassName="justify-content-end mb-0"
                      >
                        <PaginationItem className="disabled">
                          <PaginationLink
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                            tabIndex="-1"
                          >
                            <i className="fas fa-angle-left"/>
                            <span className="sr-only">Previous</span>
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem className="active">
                          <PaginationLink
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            1
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <i className="fas fa-angle-right"/>
                            <span className="sr-only">Next</span>
                          </PaginationLink>
                        </PaginationItem>
                      </Pagination>
                    </nav>
                  </Col>
                </Row>
              </CardFooter>
            </Card>
          </div>
        </Row>
        <Modal
          centered
          size="sm"
          isOpen={isOpen}
          toggle={closeModal}
        >
          <ModalHeader toggle={closeModal}>
            {modal.title}
          </ModalHeader>
          <ModalBody>
            {modal.content}
          </ModalBody>
          {
            modal.footer &&
            <ModalFooter>
              <Button
                color="primary"
                onClick={modal.OKBtn.action}
              >
                Add
              </Button>
              <Button onClick={modal.CancelBtn.action}>
                {modal.CancelBtn.title}
              </Button>
            </ModalFooter>
          }
        </Modal>
      </Container>
    </>
  );
}

export default RobotSoftware;
