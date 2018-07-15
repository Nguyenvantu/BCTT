import React from 'react';
import {
  FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, GooglePlusShareButton, GooglePlusIcon,
  LinkedinShareButton, LinkedinIcon, ViberShareButton, ViberIcon, WhatsappShareButton, WhatsappIcon, TelegramIcon,
  TelegramShareButton, EmailShareButton, EmailIcon
} from 'react-share';

const Share = ({t, shareUrl, name}) =>
  <div className="share">
    <div title={`${t('share')} Facebook`}>
      <FacebookShareButton
        url={shareUrl}
        quote={name}
        className="social-share"
        hashtag="#music_mp3">
        <FacebookIcon
          size={32}
          round />
      </FacebookShareButton>
    </div>
    <div title={`${t('share')} Twitter`}>
      <TwitterShareButton
        url={shareUrl}
        title={name}
        className="social-share">
        <TwitterIcon
          size={32}
          round />
      </TwitterShareButton>
    </div>
    <div title={`${t('share')} GoolePlus`}>
      <GooglePlusShareButton
        url={shareUrl}
        className="social-share">
        <GooglePlusIcon
          size={32}
          round />
      </GooglePlusShareButton>
    </div>
    <div title={`${t('share')} Telegram`}>
      <TelegramShareButton
        url={shareUrl}
        title={name}
        className="social-share"
      >
        <TelegramIcon
          size={32}
          round />
      </TelegramShareButton>
    </div>
    <div title={`${t('share')} Linkedin`}>
      <LinkedinShareButton
        url={shareUrl}
        title={name}
        description={name}
        className="social-share"
      >
        <LinkedinIcon
          size={32}
          round />
      </LinkedinShareButton>
    </div>
    <div title={`${t('share')} Viber`}>
      <ViberShareButton
        url={shareUrl}
        title={name}
        className="social-share"
      >
        <ViberIcon
          size={32}
          round />
      </ViberShareButton>
    </div>
    <div title={`${t('share')} What's app`}>
      <WhatsappShareButton
        url={shareUrl}
        title={name}
        className="social-share"
      >
        <WhatsappIcon
          size={32}
          round />
      </WhatsappShareButton>
    </div>
    <div title={`${t('share')} Email`}>
      <EmailShareButton
        url={shareUrl}
        subject={name}
        className="social-share"
      >
        <EmailIcon
          size={32}
          round />
      </EmailShareButton>
    </div>
  </div>

export default Share;