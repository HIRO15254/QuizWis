import { pothosBuilder } from '../builder';

export const Room = pothosBuilder.prismaNode('Room', {
  name: 'Room',
  id: { field: 'databaseId' },
  fields: (t) => ({
    databaseId: t.exposeString('databaseId'),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
    name: t.exposeString('name'),
    users: t.relation('users'),
    round: t.relation('round'),
  }),
});
