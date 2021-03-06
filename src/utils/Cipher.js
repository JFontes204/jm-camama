import crypto from 'crypto';
import env from 'react-dotenv';

const encrypt = (str) => {
  const mykey = crypto.createCipher(
    process.env.REACT_APP_ALGHORITHM,
    process.env.REACT_APP_APP_SECRET
  );
  let mystr = mykey.update(str, 'utf8', 'hex');
  mystr += mystr.final('hex');
  return mystr;
};
const decrypt = (str) => {
  const mykey = crypto.createDecipher(
    process.env.REACT_APP_ALGHORITHM,
    process.env.REACT_APP_APP_SECRET
  );
  let mystr = mykey.update(str, 'hex', 'utf8');
  mystr += mystr.final('utf8');
  return mystr;
};
export default {
  encrypt,
  decrypt,
};
