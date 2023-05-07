import { RoomRole } from '@prisma/client';

import { pothosBuilder } from '../builder';

pothosBuilder.prismaNode('User_Room', {
  select: {
    databaseId: true,
  },
  name: 'User_Room',
  id: { field: 'databaseId' },
  fields: (t) => ({
    databaseId: t.exposeString('databaseId'),
    UserData: t.relation('userData'),
    room: t.relation('room'),
    role: t.expose('role', { type: RoomRole }),
  }),
});
