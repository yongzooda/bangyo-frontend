import React from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterFailure = ({ message }) => {
  const navigate = useNavigate();

  const handleRedirectToRegister = () => {
    navigate('/register');
  };

  const handleRedirectToLogin = () => {
    navigate('/login');
  };

  return (
    <div>
      <h1>회원가입 실패</h1>
      <p>{message || '이미 존재하는 사용자 이름이거나 이메일입니다.'}</p>
      <button onClick={handleRedirectToRegister}>다시 회원가입</button>
      <button onClick={handleRedirectToLogin}>로그인 화면으로 이동</button>
    </div>
  );
};

export default RegisterFailure;
