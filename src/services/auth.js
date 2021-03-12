const isAuthenticated = () => {
  // Get object from localStorage
  const token = JSON.parse(localStorage.getItem('token'));
  return {
    success: token !== null ? true : false,
    error: false,
  };
};
export default isAuthenticated;
