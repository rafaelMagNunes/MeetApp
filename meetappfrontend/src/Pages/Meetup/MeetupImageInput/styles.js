import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  margin-bottom: 30px;
  border: none;

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    img {
      height: 300px;
      width: 940px;
      border-radius: 4px;
      margin-bottom: 15px;
      background: #222;
    }

    input {
      display: none;
    }
  }
`;
