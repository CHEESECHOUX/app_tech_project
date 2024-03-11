# 💡 AppTech Project

- 기간 : 3월 7일 ~ 3월 12일
- Language & Framework : TypeScript, Nest.JS (10.2.0), TypeORM (0.3.20)
- Database : AWS RDS(MySQL)
<br>

# 🛠 ERD 및 테이블 구조
- 실제 데이터베이스 테이블 간에는 외래 키(FK) 연결이 설정되어 있지 않지만, 이해를 돕기 위해 ERD 상에서는 외래 키로 표현했습니다.
![app_tech2](https://github.com/CHEESECHOUX/app_tech_project/assets/89918678/48645540-55c3-4ce8-bfe7-f33821451a5f)
<br>

# 📡 API
### [API Documentation](https://documenter.getpostman.com/view/20782433/2sA2xiWC7M)

### api 응답값
- api 응답값은 json을 기본 형식으로 하며, 아래 구조를 기반으로 코드를 작성했습니다.

```json
{
  "code": "integer,  // 정상 처리 시 0, 아닐 경우 다른 값",
  "message": "string",
  "data": "Object"
}
```

<br>

# 🤔 Question 조건
- 얻을 수 있는 포인트는 question마다 다름

## 1. Question 정답 3가지 타입 조건
-	타입 1 & 타입2:  입력값이 answer값과 일치하면 정답처리
-	타입 3: 입력값이 question title 값 뒤에 + “a”를 한 값과 같으면 정답처리
-	정답이 틀릴 경우 code는 1
<br>

## 2. Question 목록 조회 조건
-	여러 Questions가 동일한 mid값을 가질 수 있다.
-	타입1: 한 user는 동일한 mid값을 가진 question에 대해 하루에 한번만 참여가 가능하다.
-	타입2: 한 user는 동일한 mid값을 가진 question에 대해 3시간에 한 번 참여가 가능하다.
-	타입3: 한 user는 동일한 mid값을 가진 question에 대해 기간에 관계 없이 한 번만 참여 가능하다.
-	question은 전체 user에 대해 매일 정해진 quantity까지만 참여가 가능하다.
-	조건을 만족하는 question이 3개 이상일 경우 3개까지만 반환한다.
-	위 조건을 만족하는 question이 없는 경우 code에 1을 내려준다.
<br>
<br>

# 🙌🏻 구현한 기능
1. 회원가입(이메일, 비밀번호)
2. 로그인
3. 회원정보수정
4. 회원탈퇴
5. Question 목록 조회
6. Question의 정답 제출 시 유저에게 캐시 지급
7. 유저의 캐시 지급 내역 저장
8. 테스트 코드 : Question에 새로운 타입이 추가되어 정답 처리하는 로직이 수정되었을 경우, 모든 타입의 Question의 정답 처리가 정상적으로 되는지 확인
<img width="394" alt="스크린샷 2024-03-12 오전 1 12 53" src="https://github.com/CHEESECHOUX/app_tech_project/assets/89918678/fb131de4-2616-4fb1-bf49-1ea3c9cb0554">

<br>

- 6, 7번은 하나의 메서드에 구현했습니다.

<br>
<br>
  
