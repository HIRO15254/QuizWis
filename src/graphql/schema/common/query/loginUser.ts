import { queryField } from 'nexus';

export const meQuery = queryField('loginUser', {
  type: 'UserData',
  async resolve(_parent, _args, ctx) {
    if (!ctx.currentUserData) throw new Error('No user logged in.');
    return ctx.prisma.userData.findUnique(
      { where: { databaseId: ctx.currentUserData.databaseId } },
    );
  },
});
