import { objectType } from 'nexus';
import { UserData } from 'nexus-prisma';

export const userDataObject = objectType({
  name: UserData.$name,
  description: UserData.$description,
  definition(t) {
    t.implements('Node');
    //* メタデータ
    t.field(UserData.databaseId);
    t.field(UserData.createdAt);
    t.field(UserData.updatedAt);

    //* 基本データ
    t.field(UserData.userId);
    t.field(UserData.name);
    t.field(UserData.bio);
    t.field(UserData.email);
    t.field(UserData.iconUrl);
    t.field(UserData.isDarkTheme);

    t.field(UserData.isAdmin);

    //* 得点表示用データ
    t.field(UserData.scoreBoardRooms);
    t.field(UserData.rounds);

    t.nonNull.id('id', {
      description: 'relay仕様のID',
      resolve: (parent, _args, _ctx) => Buffer.from(`UserData:${parent.databaseId}`).toString('base64'),
    });
  },
});
