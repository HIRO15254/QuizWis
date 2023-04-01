import { objectType } from 'nexus';
import { UserData } from 'nexus-prisma';

import { roomRole } from '../enum/roomRole';

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
    t.field(UserData.room);
    t.field(UserData.roomId);
    t.field(UserData.roomRole.name, { type: roomRole });
    t.nonNull.id('id', {
      resolve: (parent, _args, _ctx) => Buffer.from(`UserData:${parent.databaseId}`).toString('base64'),
    });
  },
});
