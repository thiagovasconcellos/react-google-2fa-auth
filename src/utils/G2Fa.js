import speakeasy from 'speakeasy';
import qrcode from 'qrcode';

export const generateQrCode = () => {
  const response = {
    secret: '',
    imgPath: '',
  };
  const auth = speakeasy.generateSecret({
    name: 'CBYK-Test',
  });

  qrcode.toDataURL(auth.otpauth_url, (err, data) => {
    if (err) throw err;
    response.imgPath = data;
  });
  response.secret = auth.ascii;
  return response;
};

export const validateToken = (secret, token) => speakeasy.totp.verify({
  secret,
  encoding: 'ascii',
  token,
});
