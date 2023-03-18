# バックエンドの方針

## 使用する技術

### PostgreSQL

RDB管理システム。
今回はSQLはほとんど直接叩くことはないと思う。
実体はDockerで立てている。

### Prisma

Node.js用のORM。
PostgreSQLへの実際のマイグレーション等SQLを投げる作業はこれに任せている。

### GraphQL