# Node.js 공식 이미지를 기본으로 사용
FROM node:18.17.1

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json (또는 yarn.lock) 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 소스 코드 복사
COPY . .

# 3000번 포트 열기
EXPOSE 3000

# 개발 모드로 애플리케이션 실행
CMD ["npm", "start"]