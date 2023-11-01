const Notification = ({ message, text }) => {
  if (message === null) {
    return null;
  }

  return <div className={text}>{message}</div>;
};

export default Notification;
