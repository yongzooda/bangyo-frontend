import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email,
        password,
      });

      if (response.status === 200) {
        // JWT를 로컬 스토리지에 저장
        localStorage.setItem('token', response.data.accessToken);
        alert('로그인 성공!');
        window.location.href = '/'; // 홈으로 리디렉션
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('로그인 실패: 잘못된 이메일 또는 비밀번호입니다.');
      } else {
        console.error('로그인 중 오류:', error);
        alert('로그인 중 문제가 발생했습니다.');
      }
    }
  };

  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleLogin}>
        <label>이메일</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label>비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">로그인</button>
      </form>

      <hr />
      <a href="http://localhost:8080/oauth2/authorization/naver">네이버로 로그인</a>
      <hr />
      <p>계정이 없으신가요? <Link to="/register">회원가입</Link></p>
    </div>
  );
};

export default Login;
