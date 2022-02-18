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
import React from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import  {useState, useContext, useEffect} from 'react';
import {robotdata} from "../network/ApiAxios";
import axios from 'axios';





// class Index extends React.Component {
function Index(){
  //robotstatements data [mongoDB side]
  let [data, setData] = useState("");
  let [id, setId] = useState("");
  // let [battery, setBattery] = useState("");
  // let [power, setPower] = useState("");

  //robots data [mongoDB side]
  let [datarobots, setDatarobots] = useState("");

  // let [x, setX] = useState("");
  // let [y, setY] = useState("");
  // let [z, setZ] = useState("");
  // let [date, setDate] = useState("");
  let [activeNav, setActiveNav] = useState(1);
  let [chartExample1Data, setChartExample1Data] = useState("data1");
  function changedata1(){
    var current1 = [...activeNav];
    current1[0] = 1;
    setActiveNav(current1);
  }
  function changedata2(){
    var current2 = [...activeNav];
    current2[0] = 2;
    setActiveNav(current2);
  }
  function switchdata(){
    var currentdate = chartExample1Data
    console.log(chartExample1Data);
    { currentdate === "data1"
    ? setChartExample1Data("data2")
    : setChartExample1Data("data1")
    }
  }
  useEffect(() => {
    axios.get('http://localhost:5100/api/users/robotsstate/find')
    .then((result)=>{ 
      var arraydata = [];
      var arrayid = [];
      // var arraybattery = [];
      // var arraypower = [];
      for (var i = 0; i < 5; i ++){
        arraydata.push(result.data[i])
        arrayid.push(result.data[i].id);
        // arraybattery.push(result.data[i].battery);
        // arraypower.push(result.data[i].power);
      }
      setData(arraydata);
      setId(arrayid);
      // setBattery(arraybattery);
      // setPower(arraypower);

      //Debagger
      //  data.map(function(a){
      //   return (
      //     <>
      //     </>                   
      //   )
      // })
    })
    .catch(()=> {console.log("maping error")})
  }, [data]);
  useEffect(() => {
    axios.get('http://localhost:5100/api/users/robots/find')
    .then((result)=>{ 
      var array = [];
      for (var i = 0; i < 5; i ++){
        array.push(result.data[i]);
        // console.log(result.data[i].name+i);
      }
      setDatarobots(array);
    })
    .catch(()=> {console.log("maping error")})
  }, [datarobots]);
    
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }

    
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="mb-5 mb-xl-0" xl="8">
              <Card className="bg-gradient-white shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-light ls-1 mb-1">
                        Overview
                      </h6>
                      <h2 className="text-black mb-0">Step Count</h2>
                    </div>
                    <div className="col">
                      <Nav className="justify-content-end" pills>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              // active: this.state.activeNav === 1
                              active : activeNav === 1
                            })}
                            href="#pablo"
                            // onClick={e => this.toggleNavs(e, 1)}
                            onClick={() => {switchdata()}}
                          >
                            <span className="d-none d-md-block">Month</span>
                            <span className="d-md-none">M</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              // active: this.state.activeNav === 2
                              active : activeNav === 2 
                              // active : {changedata2()}
                            })}
                            data-toggle="tab"
                            href="#pablo"
                            // onClick={e => this.toggleNavs(e, 2)}
                            onClick={() => {switchdata()}}
                          >
                            <span className="d-none d-md-block">Week</span>
                            <span className="d-md-none">W</span>
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/* Chart */}
                  <div className="chart">
                    <Line
                      data={chartExample1[chartExample1Data]}
                      options={chartExample1.options}
                      getDatasetAtEvent={e => console.log(e)}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            {/* performance */}
            <Col xl="4">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Performance
                      </h6>
                      <h2 className="mb-0">Usage time</h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/* Chart */}
                  <div className="chart">
                    <Bar
                      data={chartExample2.data}
                      options={chartExample2.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {/* page visits */}
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="8">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Angel Robot Statement</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        See all
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">name</th>
                      <th scope="col">Total step</th>
                      <th scope="col">serial No.</th>
                      <th scope="col">Bounce rate</th>
                    </tr>
                  </thead>
                    { datarobots && datarobots.map(function(a){
                      return (
                        <tbody>
                        <tr>
                          
                      <th scope="row">{a.name}</th>
                      <td>{a.steps}</td>
                      <td>{a.id}</td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{" "}
                        46,53%
                      </td>
                    </tr>
                    </tbody>                    
                    )
                    })}
                </Table>
              </Card>
            </Col>
            <Col xl="4">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Battery</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        See all
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Power</th>
                      <th scope="col">Battery</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data && data.map(function(a){
                      return (
                        <tr>
                        <th scope="row">{a.id}</th>
                          <td>{a.power}</td>
                            <td>
                              <div className="d-flex align-items-center">
                            <span className="mr-2">{a.battery}%</span>
                                  <div>
                                  {a.power === "on"
                                      ? <Progress
                                        max="100"
                                        value={a.battery}
                                        barClassName="bg-gradient-success"
                                        />
                                      : <Progress
                                        max="100"
                                        value={a.battery}
                                        barClassName="bg-gradient-danger"
                                        />
                                      }
                                    {/* <Progress
                                      max="100"
                                      value={a.battery}
                                      
                                      barClassName="bg-gradient-danger"
                                    /> */}
                                </div>
                              </div>
                            </td>
                        </tr>
                      )
                    })}
                    </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }


export default Index;
