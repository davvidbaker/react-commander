import styled from 'styled-components';

const Wrapper = styled.div`
  width: 400px;
  margin: 0 auto;
  background: white;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.2),
    0 2px 6px rgba(0, 0, 0, 0.1);
  font-size: small;
  border: 1px solid #ddd;

  input {
    width: 100%;
    padding: 5px;
    font-size: 1em;
    border: none;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: #bababa;
    }
  }
`;

export default Wrapper;
