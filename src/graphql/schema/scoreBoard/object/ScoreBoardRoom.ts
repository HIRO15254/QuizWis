import { objectType } from 'nexus';
import { ScoreBoardRoom } from 'nexus-prisma';

export const scoreBoardRoomObject = objectType({
  name: ScoreBoardRoom.$name,
  description: ScoreBoardRoom.$description,
  definition(t) {
    //* メタデータ
    t.field(ScoreBoardRoom.databaseId);
    t.field(ScoreBoardRoom.createdAt);
    t.field(ScoreBoardRoom.updatedAt);

    //* 実データ
    t.field(ScoreBoardRoom.name);
    t.field(ScoreBoardRoom.hashedPassword);
    t.field(ScoreBoardRoom.users);
    // t.field(ScoreBoardRoom.round);

    //* relay関係
    t.implements('Node');
    t.nonNull.id('id', {
      description: 'relay仕様のID',
      resolve: (parent, _args, _ctx) => Buffer.from(`ScoreBoardRoom:${parent.databaseId}`).toString('base64'),
    });

    //* 便利フィールド
    t.nonNull.field('hasPassword', {
      description: 'パスワードがかかっているか',
      type: 'Boolean',
      resolve: (parent, _args, _ctx) => parent.hashedPassword !== null,
    });
  },
});
