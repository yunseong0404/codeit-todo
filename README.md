# 투두 리스트

할 일을 추가하고, 완료 여부를 관리하고, 할 일마다 메모와 이미지를 남길 수 있는 투두 리스트 웹 애플리케이션입니다.

## 주요 기능

### 목록 페이지 (`/`)
- 할 일 추가 (Enter 키 또는 추가하기 버튼, 빈 값은 등록 불가)
- 할 일 / 완료한 일을 TO DO, DONE 영역으로 나눠서 표시
- 체크박스로 완료 / 완료 취소
- 목록이 비어 있을 때 안내 화면 표시

### 상세 페이지 (`/items/[id]`)
- 할 일 이름, 완료 여부 수정
- 메모 작성
- 이미지 첨부 및 변경
  - 5MB 이하 이미지만 업로드 가능
  - 한글 파일명도 업로드할 수 있도록 업로드 직전에 `image-타임스탬프.확장자` 형식으로 파일명 자동 변경
- 변경 사항이 있을 때만 수정 완료 버튼 활성화
- 할 일 삭제

### 공통
- 반응형 레이아웃 (모바일 / 태블릿 / 데스크톱)

## 기술 스택

| 구분 | 사용 기술 |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| UI | React 19 |
| Styling | Tailwind CSS v4 |
| HTTP Client | Axios |
| Lint | ESLint (eslint-config-next) |


## 폴더 구조

```
src/
├── app/
│   ├── layout.tsx              # 공통 레이아웃 (헤더, 폰트)
│   ├── globals.css             # Tailwind 테마 (색상, 폰트, 그림자)
│   ├── (todos)/                # 목록 페이지 "/"
│   │   ├── page.tsx
│   │   └── _components/        # 목록 페이지 컴포넌트
│   └── items/[id]/             # 상세 페이지 "/items/:id"
│       ├── page.tsx           
│       └── _components/        # 상세 페이지 컴포넌트
├── components/
│   └── layout/header.tsx       # 공용 헤더
├── hooks/
│   ├── use-todos.ts            # 목록 페이지 훅
│   └── use-todo.ts             # 상세 페이지 훅
├── lib/
│   ├── axios.ts                # axios 인스턴스
│   └── api.ts                  # API 요청 함수
└── types/
    └── todo.ts                 # Todo 타입
```


## 배포

https://codeit-todo-sage.vercel.app/
