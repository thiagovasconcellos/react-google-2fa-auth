import React, { useState, useEffect } from 'react';
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import { ToastContainer, toast } from 'react-toastify';
import GlobalStyle from './styles/global';
import { Container } from './styles';


function App() {
  const [img, setImg] = useState('');
  const [secret, setSecret] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    function loadData() {
      setImg(localStorage.getItem('imgData') ? localStorage.getItem('imgData') : '');
      setSecret(localStorage.getItem('secret') ? localStorage.getItem('secret') : '');
    }
    loadData();
  }, []);
  function generateQrCode() {
    const auth = speakeasy.generateSecret({
      name: 'CBYK-Test',
    });

    qrcode.toDataURL(auth.otpauth_url, (err, data) => {
      if (err) throw err;
      setImg(data);
      localStorage.setItem('imgData', data);
    });
    setSecret(auth.ascii);
    localStorage.setItem('secret', auth.ascii);
  }

  function validateToken() {
    if (!token) {
      toast.error('É necessário digitar o token');
      return;
    }
    if (!secret) {
      toast.error('O código validador não foi gerado. Gere o código de barras');
      return;
    }
    const verify = speakeasy.totp.verify({
      secret,
      encoding: 'ascii',
      token,
    });

    if (verify) {
      toast.info('Token válido');
    } else {
      toast.error('Token inválido');
    }
  }
  return (
    <>
      <GlobalStyle />
      <ToastContainer autoClose={3000} />
      <Container>
        <img src={img} alt="" />
        <button disabled={!!img} onClick={() => generateQrCode()} type="button">Gerar código de barras</button>
        <input onInput={(e) => setToken(e.target.value)} placeholder="Digite o código de validação" />
        <button onClick={() => validateToken()} type="button">Verificar</button>
      </Container>
    </>
  );
}

export default App;
