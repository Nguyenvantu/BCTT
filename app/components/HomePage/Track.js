import React from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import { Link } from 'react-router';
import { changeAlias } from '../../utils/func';
import LinksByComma from '../LinksByComma';
import LazyloadImage from '../LazyloadImage';

const Track = (props) => {
  const {
    name,
    id,
    downloadProgress,
    download
  } = props;

  return (
    downloadProgress.id === id && downloadProgress.isDownloading
      ? <CircularProgressbar percentage={downloadProgress.percent} />
      : 
      <button className='sc-ir' onClick={props.download({ songName: changeAlias(name), id })}>
        <i className="ion-android-download" title="download the track" />
      </button>
  );
};

export default Track;
