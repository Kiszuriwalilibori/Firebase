const isOffline = () => {
  return window.navigator.onLine ? false : true;
};

export default isOffline;
