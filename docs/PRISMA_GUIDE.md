# Prisma 핵심 가이드

Prisma를 처음 사용하는 개발자를 위한 핵심 내용과 실무 패턴 정리.

---

## 📚 목차

1. [Prisma란?](#prisma란)
2. [스키마 작성](#스키마-작성)
3. [Prisma Client 생성 및 사용](#prisma-client-생성-및-사용)
4. [기본 CRUD 메서드](#기본-crud-메서드)
5. [고급 쿼리 패턴](#고급-쿼리-패턴)
6. [관계(Relations) 다루기](#관계relations-다루기)
7. [트랜잭션](#트랜잭션)
8. [에러 처리](#에러-처리)
9. [Next.js 통합 패턴](#nextjs-통합-패턴)
10. [마이그레이션](#마이그레이션)
11. [성능 최적화](#성능-최적화)

---

## Prisma란?

Prisma는 **타입 안전한 데이터베이스 ORM**입니다.

- **타입 안전성**: TypeScript와 완벽 통합
- **자동 완성**: IDE에서 쿼리 자동 완성 지원
- **마이그레이션**: 스키마 변경을 버전 관리
- **다중 DB 지원**: PostgreSQL, MySQL, SQLite, MongoDB 등

---

## 스키마 작성

### 기본 구조

```Js
// prisma/schema.prisma

generator client {
  provider = "prisma-client"
  output   = "../lib/generated/prisma"  // 커스텀 출력 경로 (선택)
}

datasource db {
  provider = "postgresql"  // 또는 "mysql", "sqlite" 등
}

model User {
  id        String   @id @default(uuid())  // 또는 @default(cuid())
  email     String   @unique
  name      String?
  posts     Post[]   // 1:N 관계
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")  // 테이블명 매핑
}
```

### 주요 필드 타입

```Js
model Example {
  // 문자열
  id      String   @id @default(uuid())
  email   String   @unique
  name    String?

  // 숫자
  age     Int
  price   Float
  balance Decimal  @db.Decimal(10, 2)

  // 불리언
  isActive Boolean @default(true)

  // 날짜
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // JSON
  metadata Json

  // 배열 (PostgreSQL)
  tags     String[]

  // Enum
  role     UserRole @default(USER)
}

enum UserRole {
  USER
  ADMIN
  MODERATOR
}
```

### 관계 정의

```Js
// 1:N 관계
model User {
  id    String @id @default(uuid())
  posts Post[]
}

model Post {
  id     String @id @default(uuid())
  userId String
  user   User   @relation(fields: [userId], references: [id])
}

// N:M 관계
model Post {
  id     String @id @default(uuid())
  tags   Tag[]
}

model Tag {
  id    String @id @default(uuid())
  posts Post[]
}

// 1:1 관계
model User {
  id      String  @id @default(uuid())
  profile Profile?
}

model Profile {
  id     String @id @default(uuid())
  userId String @unique
  user   User   @relation(fields: [userId], references: [id])
}
```

---

## Prisma Client 생성 및 사용

### 1. Client 생성

```typescript
// lib/utils/prisma.ts
import { PrismaClient } from "@/lib/generated/prisma/client";

// 개발 환경에서 Hot Reload 시 인스턴스 재생성 방지
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
```

### 2. PostgreSQL 어댑터 사용 (Connection Pooling)

```typescript
import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({
  adapter,
  log: ["query", "error", "warn"],
});
```

---

## 기본 CRUD 메서드

### CREATE (생성)

```typescript
// 단일 생성
const user = await prisma.user.create({
  data: {
    email: "user@example.com",
    name: "홍길동",
  },
});

// 여러 개 생성
const users = await prisma.user.createMany({
  data: [
    { email: "user1@example.com", name: "사용자1" },
    { email: "user2@example.com", name: "사용자2" },
  ],
  skipDuplicates: true, // 중복 시 스킵
});
```

### READ (조회)

```typescript
// 단일 조회 (고유 필드)
const user = await prisma.user.findUnique({
  where: { id: "user-id" },
});

// 단일 조회 (일반 필드)
const user = await prisma.user.findFirst({
  where: { email: "user@example.com" },
});

// 여러 개 조회
const users = await prisma.user.findMany({
  where: {
    email: {
      contains: "@example.com", // LIKE 검색
    },
  },
  orderBy: {
    createdAt: "desc",
  },
  take: 10, // LIMIT
  skip: 0, // OFFSET
});
```

### UPDATE (수정)

```typescript
// 단일 수정
const user = await prisma.user.update({
  where: { id: "user-id" },
  data: {
    name: "새 이름",
    email: "new@example.com",
  },
});

// 여러 개 수정
const result = await prisma.user.updateMany({
  where: {
    isActive: false,
  },
  data: {
    isActive: true,
  },
});

// 조건부 업데이트 또는 생성 (UPSERT)
const user = await prisma.user.upsert({
  where: { email: "user@example.com" },
  update: {
    name: "업데이트된 이름",
  },
  create: {
    email: "user@example.com",
    name: "새 사용자",
  },
});
```

### DELETE (삭제)

```typescript
// 단일 삭제
const user = await prisma.user.delete({
  where: { id: "user-id" },
});

// 여러 개 삭제
const result = await prisma.user.deleteMany({
  where: {
    isActive: false,
  },
});
```

---

## 고급 쿼리 패턴

### 필터링 (Where)

```typescript
// 기본 비교
await prisma.user.findMany({
  where: {
    age: { gt: 18 }, // age > 18
    age: { gte: 18 }, // age >= 18
    age: { lt: 65 }, // age < 65
    age: { lte: 65 }, // age <= 65
    age: { not: 20 }, // age != 20
  },
});

// 문자열 검색
await prisma.user.findMany({
  where: {
    email: {
      contains: "@gmail", // LIKE '%@gmail%'
      startsWith: "admin", // LIKE 'admin%'
      endsWith: ".com", // LIKE '%.com'
    },
  },
});

// 배열 검색
await prisma.post.findMany({
  where: {
    tags: {
      has: "typescript", // 배열에 포함
      hasEvery: ["react", "nextjs"], // 모든 요소 포함
      hasSome: ["react", "vue"], // 하나 이상 포함
    },
  },
});

// IN / NOT IN
await prisma.user.findMany({
  where: {
    id: {
      in: ["id1", "id2", "id3"],
    },
  },
});

// AND / OR / NOT
await prisma.user.findMany({
  where: {
    AND: [{ age: { gte: 18 } }, { isActive: true }],
    OR: [{ email: { contains: "@gmail" } }, { email: { contains: "@naver" } }],
    NOT: {
      role: "BANNED",
    },
  },
});
```

### 정렬 (OrderBy)

```typescript
await prisma.user.findMany({
  orderBy: [{ createdAt: "desc" }, { name: "asc" }],
});
```

### 페이징

```typescript
// Offset 기반
const users = await prisma.user.findMany({
  skip: (page - 1) * pageSize,
  take: pageSize,
});

// Cursor 기반 (더 효율적)
const users = await prisma.user.findMany({
  take: 10,
  cursor: {
    id: lastUserId,
  },
  skip: 1, // cursor 자체는 제외
});
```

### 집계 (Aggregate)

```typescript
// 개수
const count = await prisma.user.count({
  where: { isActive: true },
});

// 집계 함수
const stats = await prisma.user.aggregate({
  _count: { id: true },
  _avg: { age: true },
  _sum: { balance: true },
  _min: { createdAt: true },
  _max: { createdAt: true },
  where: {
    isActive: true,
  },
});
```

### 관계 포함 (Include)

```typescript
// 관계 데이터 포함
const user = await prisma.user.findUnique({
  where: { id: "user-id" },
  include: {
    posts: {
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 5,
    },
    profile: true,
  },
});

// 특정 필드만 선택 (Select)
const user = await prisma.user.findUnique({
  where: { id: "user-id" },
  select: {
    id: true,
    email: true,
    name: true,
    posts: {
      select: {
        id: true,
        title: true,
      },
    },
  },
});
```

---

## 관계(Relations) 다루기

### 관계 생성

```typescript
// 기존 User에 Post 연결
const post = await prisma.post.create({
  data: {
    title: "새 포스트",
    userId: "user-id",
  },
});

// 중첩 생성 (Nested Write)
const user = await prisma.user.create({
  data: {
    email: "user@example.com",
    posts: {
      create: [{ title: "포스트 1" }, { title: "포스트 2" }],
    },
  },
});

// 기존 레코드 연결
const post = await prisma.post.create({
  data: {
    title: "새 포스트",
    user: {
      connect: { id: "user-id" },
    },
    tags: {
      connect: [{ id: "tag-id-1" }, { id: "tag-id-2" }],
    },
  },
});
```

### 관계 업데이트

```typescript
// 연결 변경
await prisma.post.update({
  where: { id: "post-id" },
  data: {
    user: {
      connect: { id: "new-user-id" },
    },
  },
});

// 연결 해제
await prisma.post.update({
  where: { id: "post-id" },
  data: {
    user: {
      disconnect: true,
    },
  },
});

// 연결 설정/해제
await prisma.post.update({
  where: { id: "post-id" },
  data: {
    tags: {
      set: [{ id: "tag-1" }, { id: "tag-2" }], // 기존 연결 제거 후 새로 연결
    },
  },
});
```

---

## 트랜잭션

### 순차 실행 트랜잭션

```typescript
const result = await prisma.$transaction(async (tx) => {
  const user = await tx.user.create({
    data: { email: "user@example.com" },
  });

  const post = await tx.post.create({
    data: {
      title: "새 포스트",
      userId: user.id,
    },
  });

  return { user, post };
});
```

### 병렬 실행 트랜잭션

```typescript
const [user, post] = await prisma.$transaction([
  prisma.user.create({
    data: { email: "user@example.com" },
  }),
  prisma.post.create({
    data: { title: "새 포스트" },
  }),
]);
```

### 인터랙티브 트랜잭션 (타임아웃 설정)

```typescript
const result = await prisma.$transaction(
  async (tx) => {
    // 여러 작업 수행
  },
  {
    maxWait: 5000, // 최대 대기 시간 (ms)
    timeout: 10000, // 타임아웃 (ms)
  }
);
```

---

## 에러 처리

### Prisma 에러 타입

```typescript
import { Prisma } from "@prisma/client";

try {
  await prisma.user.create({
    data: { email: "existing@example.com" },
  });
} catch (error) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // 알려진 에러 (예: unique constraint 위반)
    if (error.code === "P2002") {
      console.error("Unique constraint failed:", error.meta);
    }
  } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    // 알 수 없는 에러
    console.error("Unknown error:", error);
  } else if (error instanceof Prisma.PrismaClientRustPanicError) {
    // Rust 엔진 패닉
    console.error("Prisma engine panic:", error);
  } else if (error instanceof Prisma.PrismaClientInitializationError) {
    // 초기화 에러
    console.error("Initialization error:", error);
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    // 검증 에러
    console.error("Validation error:", error);
  }
}
```

### 주요 에러 코드

- `P2002`: Unique constraint 위반
- `P2025`: 레코드를 찾을 수 없음
- `P2003`: Foreign key constraint 위반
- `P2014`: Required relation 위반

---

## Next.js 통합 패턴

### Server Actions에서 사용

```typescript
"use server";

import { prisma } from "@/lib/utils/prisma";

export async function createUser(email: string, name: string) {
  try {
    const user = await prisma.user.create({
      data: { email, name },
    });
    return { success: true, user };
  } catch (error) {
    console.error("Failed to create user:", error);
    return { success: false, error: "사용자 생성 실패" };
  }
}
```

### API Route에서 사용

```typescript
// app/api/users/route.ts
import { prisma } from "@/lib/utils/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
```

### React Server Component에서 사용

```typescript
// app/users/page.tsx
import { prisma } from "@/lib/utils/prisma";

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

---

## 마이그레이션

### 마이그레이션 생성 및 적용

```bash
# 스키마 변경 후 마이그레이션 생성
npx prisma migrate dev --name add_user_table

# 프로덕션 환경에 적용
npx prisma migrate deploy

# 마이그레이션 상태 확인
npx prisma migrate status

# 마이그레이션 리셋 (개발 환경만)
npx prisma migrate reset
```

### 스키마 동기화 (개발용)

```bash
# DB를 스키마에 맞춤 (데이터 손실 가능)
npx prisma db push

# 스키마를 DB에 맞춤
npx prisma db pull
```

### Prisma Client 재생성

```bash
# 스키마 변경 후 항상 실행
npx prisma generate
```

---

## 성능 최적화

### 1. 필요한 필드만 선택

```typescript
// ❌ 나쁜 예: 모든 필드 조회
const users = await prisma.user.findMany();

// ✅ 좋은 예: 필요한 필드만 선택
const users = await prisma.user.findMany({
  select: {
    id: true,
    email: true,
    name: true,
  },
});
```

### 2. 관계 데이터 제한

```typescript
// ✅ 관계 데이터도 제한
const user = await prisma.user.findUnique({
  where: { id: "user-id" },
  include: {
    posts: {
      take: 10, // 최신 10개만
      orderBy: { createdAt: "desc" },
    },
  },
});
```

### 3. 인덱스 활용

```prisma
model User {
  id    String @id @default(uuid())
  email String @unique  // 자동 인덱스
  name  String

  @@index([name])  // name 필드에 인덱스 추가
  @@index([email, name])  // 복합 인덱스
}
```

### 4. 배치 작업

```typescript
// ✅ createMany 사용 (단일 쿼리)
await prisma.user.createMany({
  data: users,
  skipDuplicates: true,
});

// ❌ 반복 create (N개 쿼리)
for (const user of users) {
  await prisma.user.create({ data: user });
}
```

### 5. Connection Pooling

```typescript
// PostgreSQL 어댑터 사용 (권장)
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20, // 최대 연결 수
});

const adapter = new PrismaPg(pool);
export const prisma = new PrismaClient({ adapter });
```

---

## 실무 팁

### 1. 타입 안전성 활용

```typescript
// Prisma가 생성한 타입 사용
import type { User, Prisma } from "@prisma/client";

// 생성 타입
type UserCreateInput = Prisma.UserCreateInput;

// 업데이트 타입
type UserUpdateInput = Prisma.UserUpdateInput;

// Where 타입
type UserWhereInput = Prisma.UserWhereInput;
```

### 2. JSON 필드 다루기

```typescript
// JSON 필드 저장
await prisma.landingContent.upsert({
  where: { id: "default" },
  update: {
    content: data as Prisma.InputJsonValue,
  },
  create: {
    id: "default",
    content: data as Prisma.InputJsonValue,
  },
});

// JSON 필드 조회
const record = await prisma.landingContent.findUnique({
  where: { id: "default" },
});
const content = record?.content as LandingContent;
```

### 3. 로깅 설정

```typescript
const prisma = new PrismaClient({
  log: [
    { level: "query", emit: "event" },
    { level: "error", emit: "stdout" },
    { level: "warn", emit: "stdout" },
  ],
});

// 쿼리 로깅
prisma.$on("query" as never, (e: Prisma.QueryEvent) => {
  console.log("Query: " + e.query);
  console.log("Duration: " + e.duration + "ms");
});
```

### 4. Raw SQL 사용 (필요시)

```typescript
// 복잡한 쿼리는 Raw SQL 사용
const users = await prisma.$queryRaw`
  SELECT * FROM users
  WHERE age > ${18}
  ORDER BY created_at DESC
  LIMIT 10
`;

// 동적 쿼리
await prisma.$executeRawUnsafe(
  `UPDATE users SET name = $1 WHERE id = $2`,
  "새 이름",
  "user-id"
);
```

---

## 참고 자료

- [Prisma 공식 문서](https://www.prisma.io/docs)
- [Prisma 스키마 레퍼런스](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
- [Prisma Client API 레퍼런스](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)
