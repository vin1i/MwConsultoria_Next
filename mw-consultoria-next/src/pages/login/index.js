import React, { useState } from "react";
import { useRouter } from "next/router"; 
import styled from "styled-components";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AppContext"; // Ajuste conforme seu contexto

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f9f9f9;
  padding: 20px;
`;

const LoginForm = styled.form`
  background: white;
  padding: 2.5rem 2rem;
  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;

  h2 {
    text-align: center;
    color: var(--red);
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
    font-weight: bold;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: #555;
  }

  input {
    width: 100%;
    padding: 0.8rem;
    margin-bottom: 1.2rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
    transition: border-color 0.3s;

    &:focus {
      border-color: var(--red);
      outline: none;
    }
  }

  button {
    width: 100%;
    padding: 0.8rem;
    background-color: var(--red);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.2rem;
    font-weight: bold;
    transition: background-color 0.3s;

    &:hover {
      background-color: var(--dark-red);
    }

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }

  .error-message {
    color: red;
    font-size: 0.9rem;
    margin-top: -0.5rem;
    margin-bottom: 1rem;
  }
`;

const FooterText = styled.p`
  margin-top: 1rem;
  text-align: center;
  color: #777;
  font-size: 0.9rem;

  a {
    color: var(--red);
    text-decoration: none;
    font-weight: bold;
    transition: color 0.3s;

    &:hover {
      color: var(--dark-red);
    }
  }
`;

const Login = () => {
  const { login } = useAuth(); // Ajustado para useAuth do contexto
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter(); // Substituindo useNavigate por useRouter

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const success = await login(email, password);

    if (success) {
      toast.success("Login realizado com sucesso!");
      router.push("/Admin/imoveis"); // Redireciona para a rota de imóveis
    } else {
      toast.error("Erro ao realizar login. Verifique Email/Senha");
    }

    setIsSubmitting(false);
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <h2>Bem-vindo!</h2>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu email"
          required
        />
        {error && error.includes("e-mail") && (
          <p className="error-message">{error}</p>
        )}
        <label>Senha</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua senha"
          required
        />
        {error && error.includes("Senha") && (
          <p className="error-message">{error}</p>
        )}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Entrando..." : "Entrar"}
        </button>
        {error && !error.includes("e-mail") && !error.includes("Senha") && (
          <p className="error-message">{error}</p>
        )}
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
