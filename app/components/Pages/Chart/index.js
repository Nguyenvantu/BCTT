import React from 'react';
import Chart from '../../Chart';
import './index.sass';

const ChartPage = ({ pop, kpop, vpop, downloadProgress, download }) => {
  return (
    <div className="chart-page">
      <div className="chart-page-chart">
        <Chart chart={pop} downloadProgress={downloadProgress} download={download}/>
      </div>
      <div className="chart-page-chart">
        <Chart chart={kpop} downloadProgress={downloadProgress} download={download}/>
      </div>
      <div className="chart-page-chart">
        <Chart chart={vpop} downloadProgress={downloadProgress} download={download}/>
      </div>
    </div>
  );
};

export default ChartPage;