//import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Auth() {
  const KAKAO_ACCOUNT_INFO_URL = `${import.meta.env.VITE_BACKEND_URL}/api/auth/oauth`;
  const LOGIN_URL = `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`;
  const JOIN_URL = `${import.meta.env.VITE_BACKEND_URL}/api/auth/join`;
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const authCode: string | null = searchParams.get('code');
  
  const [ currentUser, setCurrentUser ] = useState({});

  useEffect( () => {
    const params = {
      code: authCode,
    };
    axios.get(KAKAO_ACCOUNT_INFO_URL, { params })
    .then(response => {
      const currentUser = response.data.user;
      console.log(currentUser);
      if(response.data.user.length === 0) {
        console.log("계정을 찾을 수 없습니다. 신규 가입!");
        axios.post(JOIN_URL, { currentUser })
          .then(response => console.log(response.data));
      } else {
        console.log("계정을 찾았습니다. 로그인!");
        axios.post(LOGIN_URL, { currentUser })
          .then(response => console.log(response.data));
      }
    })
    .catch(error => {
      // 요청이 실패하였을 때 실행되는 코드
      console.error(error);
    });
  },[]);

  return (
    <>
      로그인중입니다...
    </>
  );
}