import React from 'react';
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

function Charts({ settings }) {
  const data = React.useMemo(
    () => [
      {
        label: 'Luanda',
        data: [
          [2017, 2],
          [2018, 3],
          [2019, 4],
          [2020, 5],
          [2021, 8],
        ],
      },
      {
        label: 'Bengo',
        data: [
          [2017, 3],
          [2018, 2],
          [2019, 2],
          [2020, 5],
          [2021, 7],
        ],
      },
      {
        label: 'Huambo',
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
        <Tabs>
          {settings.charts.sede ? (
            <Tab eventKey="sede" title="Comité Sede">
              <h3>Comité Sede</h3>
              <LineChart data={data} series={series} axes={axes} />
            </Tab>
          ) : null}
          {settings.charts.provincia ? (
            <Tab eventKey="provincias" title="Comités Provinciais">
              <h3>Dados a nível províncial</h3>
              <LineChart data={data} series={series} axes={axes} />
            </Tab>
          ) : null}

          {settings.charts.municipio ? (
            <Tab eventKey="municipios" title="Comités Municipais">
              <h3>Dados a nível municípal</h3>
              <LineChart data={data1} series={series} axes={axes1} />
            </Tab>
          ) : null}

          {settings.charts.distrito ? (
            <Tab eventKey="distritos" title="Comités Distritais">
              <h3>Dados a nível distrital</h3>
              <LineChart data={data1} series={series} axes={axes1} />
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
          ) : null}

          {settings.charts.local ? (
            <Tab eventKey="locais" title="Comités Local">
              <h3>Dados a nível dos comités locais</h3>
              <LineChart data={data1} series={series} axes={axes1} />
            </Tab>
          ) : null}

          {settings.charts.nucleo ? (
            <Tab eventKey="nucleos" title="Núcleos">
              <h3>Dados a nível dos comités locais</h3>
              <LineChart data={data1} series={series} axes={axes1} />
            </Tab>
          ) : null}
        </Tabs>
      )}
    />
  );
}

export default Charts;
