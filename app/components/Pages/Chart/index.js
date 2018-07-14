import React from 'react';
import Chart from '../../Chart';
import './index.sass';

const ChartPage = ({ pop, kpop, vpop, downloadProgress, download, t }) => {
  return (
    <div className="chart-page">
      <div className="chart-page-chart">
        <div className="chart-page-title">
          {t('topUsFull')}
        </div>
        <Chart chart={pop} downloadProgress={downloadProgress} download={download}/>
      </div>
      <div className="chart-page-chart">
        <div className="chart-page-title">
          {t('topKrFull')}
        </div>
        <Chart chart={kpop} downloadProgress={downloadProgress} download={download}/>
      </div>
      <div className="chart-page-chart">
        <div className="chart-page-title">
          {t('topVnFull')}
        </div>
        <Chart chart={vpop} downloadProgress={downloadProgress} download={download}/>
      </div>
    </div>
  );
};

export default ChartPage;