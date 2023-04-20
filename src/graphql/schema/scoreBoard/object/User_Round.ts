import { objectType } from 'nexus';
import { User_Round } from 'nexus-prisma';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const User_RoundObject = objectType({
  name: User_Round.$name,
  description: User_Round.$description,
  definition(t) {
    //* メタデータ
    t.field(User_Round.databaseId);

    //* 接続情報
    t.field(User_Round.userData);
    t.field(User_Round.round);

    //* ラウンド情報データ
    // t.field(User_Round.role);
    // t.field(User_Round.rootAction);
    // t.field(User_Round.headAction);
  },
});
