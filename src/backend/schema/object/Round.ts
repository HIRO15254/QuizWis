import { pothosBuilder } from '../builder';

export const Roud = pothosBuilder.prismaNode('Round', {
  name: 'Round',
  id: { field: 'databaseId' },
  fields: (t) => ({
    databaseId: t.exposeString('databaseId'),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
    room: t.relation('room'),
    name: t.exposeString('name', { nullable: true }),
    // rule: t.relation('rule'),
    users: t.relation('users'),
    // actions: t.relation('actions'),
  }),
});
