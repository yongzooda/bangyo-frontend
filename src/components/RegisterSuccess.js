import React from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterSuccess = ({ message }) => {
  const navigate = useNavigate();

  const handleRedirectToLogin = () => {
    navigate('/login');
  };

  return (
    <div>
      <header>
        <h1>회원가입 성공</h1>
      </header>
      <main>
        <p>{message || '회원가입이 완료되었습니다. 이메일을 확인하세요.'}</p>
        <button onClick={handleRedirectToLogin}>
          로그인 화면으로 돌아가기
        </button>
      </main>
    </div>
  );
};

export default RegisterSuccess;

