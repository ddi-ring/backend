# 이벤트 카드 제작 서비스, 띠링 백엔드 프로젝트

<div align=center>

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

[![Test Status](https://github.com/ddi-ring/backend/actions/workflows/release.yml/badge.svg)](https://github.com/ddi-ring/backend/actions/workflows/release.yml)

</div>

## 시작하기

1. npm ci
2. [config 요구사항](https://github.com/ddi-ring/backend/blob/main/src/infrastructure/config.ts#L7)을 확인하고 적절한 값을 포함하는 `.env.dev` 파일을 생성합니다.
3. npm start

### 개발용 데이터베이스 준비하기

- 현재 운영 서버는 Postgresql 17.2 버전을 사용중입니다.
- 초기 데이터베이스 환경에서 `npm run db:deploy`를 실행하면 table이 생성됩니다.

## 문서

각각 자동 빌드되므로 별도의 수정이 필요하지 않습니다.

- [ERD](https://github.com/ddi-ring/backend/blob/main/ERD.md)
- [Swagger](https://doc.ddi-ring.com)
- 조직 멤버만 설치 가능한 sdk를 배포하고 있습니다.

## 명령어

### 빌드

- `npm run build` : 애플리케이션 빌드
- `npm run build:nestia` : nestia 기반으로 swagger api 문서, sdk 라이브러리 자동 빌드
- `npm run build:prisma` : prisma client & erd 자동 빌드
- `npm run build:test` : e2e test 환경 빌드

### 실행

- `npm start` : 개발환경 서버 실행
- `npm test` : 테스트 실행
    - `npm test -- [options] [test name]` : --only, --skip options 지원

### db

- `npm run db:sync` : prisma migration 동기화
- `npm run db:console` : prisma studio 실행

## 배포

- 테스트 통과시 컨테이너 기반의 aws lambda 배포를 수행합니다. package.json version 정보와 tag정보가 일치합니다.
- aws sam cli 기반으로 동작하므로 추후 cloudformation stack 제거를 통해 리소스를 모두 삭제할 수 있습니다.

## Appendix

- [Nestia 공식 가이드](https://nestia.io/docs/)
- [Typia 공식 가이드](https://typia.io/docs/)
- [prisma-markdown](https://www.npmjs.com/package/prisma-markdown)
