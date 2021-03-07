//import jwt from 'jsonwebtoken';
const isAuthenticated = () => {
  // Get object from localStorage
  const token = JSON.parse(localStorage.getItem('token'));

  /* 
  try {
    jwt.verify(token, window.env.REACT_APP_APP_SECRET, async (err, decoded) => {
      if (err) {
        return {
          success: false,
          error: 'Token inválido ou APP_SECRET inválida.',
        };
      }
      const { user_id } = decoded;
      if (!user_id) {
        return {
          success: false,
          error: 'User_id do Token não confere.',
        };
      }
      return {
        success: true,
        user_id,
      };
    });
  } catch (err) {
    console.log('error:', err);
  } */

  return {
    success: token.access_token !== null ? true : false,
    error: false,
    user_id: 1,
  };
};
export default isAuthenticated;
