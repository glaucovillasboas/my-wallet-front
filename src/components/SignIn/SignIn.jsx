import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import { Ellipsis } from 'react-spinners-css';
import Button from '../shared/Button';
import Input from '../shared/Input';
import Form from '../shared/Form';
import Title from '../shared/Title';
import { signIn } from '../../services/myWallet.services';

const SignIn = () => {
  const history = useHistory();

  const [formData, setFormData] = useState({
    email: 'email@teste.com',
    password: '12345678',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const SignInRequest = (e) => {
    e.preventDefault();
    setIsLoading(true);
    signIn(formData)
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data));
        setIsLoading(false);
        history.push('/wallet');
      })
      .catch((error) => {
        const { status } = error.response;

        if (status === 401) {
          setErrors({ ...errors, general: 'Email ou senha incorretos' });
        }

        console.log(error.response.status);
        setIsLoading(false);
      });
  };

  return (
    <Container>
      <Title>MyWallet</Title>
      <Form onSubmit={SignInRequest}>
        {errors.general && (
        <ErrorText>
          {errors.general}
        </ErrorText>
        )}

        <Input
          placeholder="E-mail"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({
            ...formData,
            email: e.target.value,
          })}
          disabled={isLoading}
          required
        />

        <Input
          placeholder="Senha"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({
            ...formData,
            password: e.target.value,
          })}
          disabled={isLoading}
          required
          password
        />

        <ActionButton type="submit" disabled={isLoading}>
          {isLoading ? (
            <Ellipsis color="white" />
          ) : (
            'Entrar'
          )}
        </ActionButton>
      </Form>

      <ContainerLink>
        <Link to="/sign-up">
          Primeira vez? Cadastre-se
        </Link>
      </ContainerLink>
    </Container>
  );
};

const ActionButton = styled(Button)`
    height: 46px;
`;

const ErrorText = styled.span`
    color: tomato;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    padding: 0 25px;
`;

const ContainerLink = styled.div`
    font-weight: bold;
    font-size: 15px;
    color: white;
    text-align: center;
    margin-top: 36px;
`;

export default SignIn;
