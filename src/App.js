import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import GlobalStyle from './styles/global';
import { Container } from './styles';
import { validateToken, generateQrCode } from './utils/G2Fa';


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
  function getQrCode() {
    try {
      const response = generateQrCode();
      setImg(response.imgPath);
      setSecret(response.secret);
      localStorage.setItem('imgData', response.imgPath);
      localStorage.setItem('secret', response.secret);
    } catch (error) {
      toast.error(error);
    }
  }

  function getValidation() {
    if (!token) {
      toast.error('É necessário digitar o token');
      return;
    }
    if (!secret) {
      toast.error('O código validador não foi gerado. Gere o código de barras');
    }

    validateToken(secret, token) ? toast.info('Token válido') : toast.error('Token inválido');
  }
  return (
    <>
      <GlobalStyle />
      <ToastContainer autoClose={3000} />
      <Container>
        <img src={img} alt="" />
        <button disabled={!!img} onClick={() => getQrCode()} type="button">Gerar código de barras</button>
        <input onInput={(e) => setToken(e.target.value)} placeholder="Digite o código de validação" />
        <button onClick={() => getValidation()} type="button">Verificar</button>
      </Container>
    </>
  );
}

export default App;
