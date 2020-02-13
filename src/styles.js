import styled from 'styled-components';


export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  border: 1px;
  align-items: center;
  justify-items: center;

  img {
    justify-items: center;
    align-items: center;
    max-width: 256px;
    max-height: 256px;
  }
  button {
      border: 1px;
      border-radius: 5px;
      background: #efefef;
      width: 250px;
      

      &:hover{        
        background: royalblue;
        color: #efefef;
      }
    }    

  input{
    width: 250px;
    border-radius: 5px;
    }
`;
