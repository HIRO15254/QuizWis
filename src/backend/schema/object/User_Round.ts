import { RoundRole } from '@prisma/client';

import { pothosBuilder } from '../builder';

pothosBuilder.prismaNode('User_Round', {
  name: 'User_Round',
  id: { field: 'databaseId' },
  fields: (t) => ({
    databaseId: t.exposeString('databaseId'),
    userData: t.relation('userData'),
    round: t.relation('round'),
    role: t.expose('role', { type: RoundRole }),
    // rootAction: t.relation('rootAction', { nullable: true }),
    // headAction: t.relation('headAction'),
  }),
});
