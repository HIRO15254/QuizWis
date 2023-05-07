import { pothosBuilder } from '../builder';

export const UserData = pothosBuilder.prismaNode('UserData', {
  name: 'UserData',
  id: { field: 'databaseId' },
  fields: (t) => ({
    databaseId: t.exposeString('databaseId'),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),

    userId: t.exposeString('userId'),
    name: t.exposeString('name'),
    bio: t.exposeString('bio', { nullable: true }),
    email: t.exposeString('email', { nullable: true }),
    iconUrl: t.exposeString('iconUrl', { nullable: true }),
    isDarkTheme: t.exposeBoolean('isDarkTheme'),

    isAdmin: t.exposeBoolean('isAdmin'),
  }),
});
