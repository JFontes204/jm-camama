import React, { useState, useEffect } from 'react';
import { Chart } from 'react-charts';
import { NavLink } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap';
import Loading from '../Loading';

function LineChart({ data, series, axes }) {
  return (
    <div
      style={{
        width: '450px',
        height: '250px',
      }}
    >
      <Chart data={data} series={series} axes={axes} tooltip />
    </div>
  );
}

function Charts() {
  const data = React.useMemo(
    () => [
      {
        label: 'Talatona',
        data: [
          [2017, 2],
          [2018, 3],
          [2019, 4],
          [2020, 5],
          [2021, 8],
        ],
      },
      {
        label: 'K. Kiaxi',
        data: [
          [2017, 3],
          [2018, 2],
          [2019, 2],
          [2020, 5],
          [2021, 7],
        ],
      },
      {
        label: 'Belas',
        data: [
          [2017, 6],
          [2018, 0],
          [2019, 7],
          [2020, 5],
          [2021, 6],
        ],
      },
    ],
    []
  );
  const series = React.useMemo(
    () => ({
      type: 'bar',
    }),
    []
  );
  const axes = React.useMemo(
    () => [
      { primary: true, type: 'ordinal', position: 'bottom' },
      { stacked: false, type: 'linear', position: 'left' },
    ],
    []
  );

  const data1 = React.useMemo(
    () => [
      {
        label: 'Talatona',
        data: [
          { x: 2017, y: 2 },
          { x: 2018, y: 3 },
          { x: 2019, y: 4 },
          { x: 2020, y: 5 },
          { x: 2021, y: 6 },
        ],
      },
      {
        label: 'K. Kiaxi',
        data: [
          { x: 2017, y: 4 },
          { x: 2018, y: 5 },
          { x: 2019, y: 6 },
          { x: 2020, y: 7 },
          { x: 2021, y: 8 },
        ],
      },
      {
        label: 'Belas',
        data: [
          { x: 2017, y: 6 },
          { x: 2018, y: 0 },
          { x: 2019, y: 7 },
          { x: 2020, y: 5 },
          { x: 2021, y: 6 },
        ],
      },
    ],
    []
  );
  const axes1 = React.useMemo(
    () => [
      { primary: true, type: 'ordinal', position: 'bottom' },
      { type: 'linear', position: 'left' },
    ],
    []
  );

  return (
    <Loading
      myRender={() => (
        <Tabs defaultActiveKey="provincias" id="uncontrolled-tab-example">
          <Tab eventKey="provincias" title="Provincias">
            <h3>Novos militantes por província</h3>
            <LineChart data={data} series={series} axes={axes} />
          </Tab>
          <Tab eventKey="municipios" title="Municipios">
            <h3>Novos militantes por município</h3>
            <LineChart data={data1} series={series} axes={axes1} />
          </Tab>
          <Tab eventKey="distritos" title="Distritos">
            <h3>Tab 3</h3>
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-center">
                <li className="page-item disabled">
                  <NavLink className="page-link" to="/charts" tabIndex={-1}>
                    Anterior
                  </NavLink>
                </li>
                <li className="page-item">
                  <NavLink className="page-link" to="/charts">
                    1
                  </NavLink>
                </li>
                <li className="page-item">
                  <NavLink className="page-link" to="/charts">
                    2
                  </NavLink>
                </li>
                <li className="page-item">
                  <NavLink className="page-link" to="/charts">
                    3
                  </NavLink>
                </li>
                <li className="page-item">
                  <NavLink className="page-link" to="/charts">
                    Próximo
                  </NavLink>
                </li>
              </ul>
            </nav>
          </Tab>
        </Tabs>
      )}
    />
  );
}

export default Charts;
