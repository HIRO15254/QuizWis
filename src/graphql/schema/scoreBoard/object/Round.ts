import { objectType } from 'nexus';
import { Round } from 'nexus-prisma';

export const roundObject = objectType({
  name: Round.$name,
  description: Round.$description,
  definition(t) {
    //* メタデータ
    t.field(Round.databaseId);
    t.field(Round.createdAt);
    t.field(Round.updatedAt);

    //* 実データ
    t.field(Round.scoreBoardRoom);

    //* ラウンド情報データ
    // t.field(Round.rule);
    // t.field(Round.users);
    // t.field(Round.actions);
    // t.field(ScoreBoardRoom.round);

    //* relay関係
    t.implements('Node');
    t.nonNull.id('id', {
      description: 'relay仕様のID',
      resolve: (parent, _args, _ctx) => Buffer.from(`Round:${parent.databaseId}`).toString('base64'),
    });

    //* 便利フィールド
  },
});
