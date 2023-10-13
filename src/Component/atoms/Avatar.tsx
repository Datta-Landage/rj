const Avatar = ({ senderName }) => (
  <div className="tw-h-12 tw-aspect-square tw-rounded-full tw-bg-gray-200 tw-my-auto tw-flex tw-border tw-border-primary/20">
    <span className="tw-m-auto">{senderName[0]}</span>
  </div>
);

export default Avatar;
