import React from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import { changeAlias } from '../../utils/func';

const Track = (props) => {
  const {
    name,
    id,
    downloadProgress,
    download
  } = props;
  return (
    downloadProgress !== undefined && downloadProgress != -1
      ? <CircularProgressbar percentage={downloadProgress} />
      :
      <button className='sc-ir' onClick={() => download({ songName: changeAlias(name), id })}>
        <i className="ion-android-download" title="download the track" />
      </button>
  )
};

export default Track;
