# SAILING(8) + Sailingg-main 디자인 통합 메모

## 적용 원칙
- 기준 프로젝트와 폴더 구조는 `SAILING/Sailing`을 유지했습니다.
- 디자인 프로젝트 소스는 `frontend/src/design/` 아래에 보존해 기존 `features/`, `components/`, `styles/` 코드를 덮어쓰지 않았습니다.
- 라우터에 디자인 페이지 경로를 연결했습니다.
- `jobsData.ts`, `partnersData.ts`, `communityData.ts`, `Home/homeData.ts`의 예시 데이터는 제거하고 빈 배열로 바꿨습니다. 화면 디자인용 데이터가 실제 DB 자료인 것처럼 노출되지 않도록 하기 위함입니다.
- `react-router` import는 기존 프로젝트와 호환되도록 `react-router-dom`으로 바꿨습니다.

## 디자인 페이지 경로
- `/design-home` : 디자인 홈 미리보기
- `/jobs`, `/jobs/detail/:jobId`, `/jobs/new` : 채용공고 디자인
- `/partners`, `/partners/detail/:partnerId` : 업체/파트너 디자인
- `/chats`, `/chats/:partnerId` : 채팅 디자인
- `/talents` : 인재 찾기 디자인
- `/community`, `/community/write`, `/community/:postId` : 커뮤니티 디자인
- `/company/:companyId/recruit` : 기업 채용 디자인
- `/mypage/admin` : 관리자 대시보드 디자인

## 중요: DB/API 연결 상태
이 ZIP은 디자인과 기존 프로젝트를 안전하게 합친 통합 작업본이며, 모든 화면의 백엔드 연동이 완료되었다는 의미는 아닙니다.
현재 SQL에는 `USERS`, `USER_INFO`, `COMPANY_INFO`, `STORE_INFO`, `COMMUNITY`, `JOBS`, `COMPANY_RECRUITER` 등의 테이블이 있지만, Java 소스에는 채용공고 CRUD, 파트너 검색, 채팅, 인재 검색을 담당하는 컨트롤러/서비스가 모두 구현되어 있지 않습니다. 프론트엔드의 API 파일 중 비어 있는 파일도 확인됐습니다.
따라서 관련 페이지는 우선 디자인을 보존하되 예시 목록을 비워 두었습니다. 실제 DB 데이터를 보여주려면 다음 API를 기존 Spring 패키지 구조에 맞춰 구현하고 페이지에서 호출해야 합니다.
- 홈 통계/추천 공고/최신 공고/커뮤니티 요약
- `JOBS` 목록/상세/등록/수정/삭제 및 `COMPANY_RECRUITER` 연결
- `STORE_INFO` 파트너 목록/상세
- 커뮤니티 목록/상세/작성/댓글/조회수
- 인재 검색 및 채팅 목록/메시지

## 확인할 점
- 업로드된 기준 파일은 `SAILING(8).zip`이었습니다. 요청에 적힌 `SAILING(7).zip`과 이름이 달라 이 작업에서는 실제 첨부된 `SAILING(8).zip`을 기준으로 삼았습니다.
- import 경로와 기존 API의 요청/응답 스키마는 실행 환경에 따라 추가 조정이 필요할 수 있습니다.
