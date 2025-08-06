import ky from 'ky';
import { handleResponse } from './hooks/handleResponse';

export const instance = ky.create({
  prefixUrl: 'http://main-alb-1302928393.ap-northeast-2.elb.amazonaws.com/', // baseURL 설정
  // headers: {
  //   Authorization: '',
  //   // 이후 헤더 항목 추가
  // },
  hooks: {
    beforeRequest: [
      async (request) => {
        if (request.method === 'POST') {
          request.headers.set('Content-Type', 'application/json');
        }
      }
    ],
     afterResponse: [
      (response) => { 
      console.log("응답 메세지:", response);
      },
      handleResponse
    ]
  }
});

export const api = instance.extend({
  timeout: 10 * 1000, // 10초 타임아웃,
  // 재시도 요청
  retry: {
    limit: 5, // 재시도 횟수
    statusCodes: [401, 400, 500], // 재시도 진행할 응답코드
    methods: ['get', 'post', 'delete'], // 재시도 진행할 http 메서드
    backoffLimit: 3 * 1000 // 재시도 간격 최대값
  }
})