import { objectType } from 'nexus';
import { UserData } from 'nexus-prisma';

export const userDataObject = objectType({
  name: UserData.$name,
  description: UserData.$description,
  definition(t) {
    t.implements('Node');
    t.field(UserData.databaseId);
    t.field(UserData.userId);
    t.field(UserData.email);
    t.field(UserData.name);
    t.field(UserData.bio);
    t.field(UserData.isAdmin);
    t.field(UserData.iconUrl);
    t.field(UserData.isDarkTheme);

    t.field(UserData.scoreBoardRooms);

    t.nonNull.id('id', {
      description: 'relay仕様のID',
      resolve: (parent, _args, _ctx) => Buffer.from(`UserData:${parent.databaseId}`).toString('base64'),
    });
  },
});
