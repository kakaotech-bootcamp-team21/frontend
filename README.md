# kakao-tech-bootcamp-team-21-autonomous-project
카카오테크 부트캠프 21조-자율 프로젝트 : SNS, 생성형 AI, WebRTC 기술을 활용한 프로젝트 개발


### 순서
### git
### 최초세팅

```bash
git clone [저장소 URL]
#의존성 설치
npm install

Docker 설치
#Docker 컨테이너 빌드 및 실행
docker-compose up --build
```


### git 협업방법
```bash
#최신 변경사항 가져오기
git pull origin main
### 본인이 담당한 기능개발 브랜치 생성
git checkout -b feature/new-feature
개발하기
개발완료하고 실행하기
#도커 사용시
docker-compose up
#컨테이너 종료
docker-compose down
#도커 사용 안할시
npm start
#리액트 종료
터미널에서 Ctrl+C

코드 테스트 및 재검토
#변경사항 스테이징
git add .
git commit -m "커밋메세지"
git push origin feature/new-feature


```
### 동료가 코드 리뷰및 테스트
다른 팀원들이 Pull Request 리뷰

피드백 하고 Pull Request 승인 및 거부

Pull Request 승인하면 main 브랜치로 병합 (squash and merge 가 깔끔함, 실무에서도 주로 사용)



```bash
#메인 브랜치에 병합
git checkout main
git pull origin main

git merge feature/new-feature
git push origin main
```
### 배포(중요 진행이 완료되었을 때)
```bash
#도커 허브 또는 기타 레지스트리에 이미지를 푸시
docker build -t your-username/your-repository:tag .
docker push your-username/your-repository:tag
#서버에서 도커 이미지를 풀하고 컨테이너를 실행
docker pull your-username/your-repository:tag
docker run -d -p 80:3000 your-username/your-repository:tag

```

# 개발자의 하루 일과

## 매일 혹은 새 작업 시작할 때
git pull origin main

git checkout -b feature/new-feature  # 새 기능 작업 시작할 때만


## 개발 환경 시작
- 도커 쓸 때: `docker-compose up`
- 도커 안 쓸 때: `npm start`

## 코드 작성하고 테스트함

## 작업 끝나면 (하루 끝이나 기능 완성 시)
git add .

git commit -m "커밋메시지"

git push origin feature/new-feature


## 개발 환경 끝낼 때
- 도커 쓸 때: `docker-compose down`
- 도커 안 쓸 때: 터미널에서 Ctrl+C

이거 거의 매일 반복함. 기능 개발 끝나면 GitHub에서 Pull Request 만들어서 코드 리뷰 요청함.

## 도커 이미지 빌드랑 배포
`docker build`, `docker push`, `docker pull`, `docker run` 이런 거는 보통 이럴 때 함:

1. 프로젝트 중요한 단계 끝날 때
2. 실제 서비스나 테스트 환경에 올릴 때
3. CI/CD 파이프라인에서 자동으로 할 때

이건 보통 팀장이나 DevOps 담당자, 아니면 배포 권한 있는 팀원이 함. 일반 개발자들은 주로 로컬에서 개발하고,기능 만들고, Git으로 협업하는 데 집중함.
