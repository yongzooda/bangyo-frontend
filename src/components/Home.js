import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [user, setUser] = useState({ username: '', authorities: '' });
  const navigate = useNavigate();

  // JWT 토큰 확인 및 사용자 정보 가져오기
  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        alert('로그인이 필요합니다.');
        navigate('/login'); // 로그인 페이지로 리디렉션
        return;
      }

      try {
        const response = await axios.get('http://localhost:8080/api/auth/user-details', {
          headers: {
            Authorization: `Bearer ${token}`, // JWT를 Authorization 헤더에 포함
          },
        });
        setUser(response.data); // 사용자 정보 업데이트
      } catch (error) {
        console.error('사용자 정보 가져오기 오류:', error);
        alert('세션이 만료되었거나, 인증에 실패했습니다. 다시 로그인하세요.');
        localStorage.removeItem('token'); // 토큰 제거
        navigate('/login'); // 로그인 페이지로 리디렉션
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // JWT 토큰 삭제
    navigate('/login'); // 로그인 페이지로 리디렉션
  };

  return (
    <div>
      <header>
        <h1>홈 화면</h1>
      </header>
      <main>
        <p>로그인에 성공했습니다! 여기가 홈 화면입니다.</p>
        <p>사용자 이름: {user.username || '알 수 없음'}</p>
        <p>사용자 권한: {user.authorities || '알 수 없음'}</p>
        <button onClick={handleLogout}>로그아웃</button>
      </main>
    </div>
  );
};

export default Home;
