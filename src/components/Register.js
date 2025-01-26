import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/users/register', form);

      if (response.status === 200) {
        alert('회원가입 성공! 이메일을 확인하세요.');
        window.location.href = '/login'; // 로그인 페이지로 리디렉션
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(`회원가입 실패: ${error.response.data}`);
      } else {
        console.error('회원가입 중 오류:', error);
        alert('회원가입 중 문제가 발생했습니다.');
      }
    }
  };

  return (
    <div>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit}>
        <label>사용자 이름</label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <br />
        <label>이메일</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <br />
        <label>비밀번호</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">회원가입</button>
      </form>
      <p>이미 계정이 있으신가요? <Link to="/login">로그인</Link></p>
    </div>
  );
};

export default Register;
