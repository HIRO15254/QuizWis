import { queryField } from 'nexus';

export const meQuery = queryField('me', {
  type: 'UserData',
  async resolve(_parent, _args, ctx) {
    if (!ctx.currentUserData) throw new Error(`You must signIn ${ctx.currentUser?.userDataId}`);
    return ctx.prisma.userData.findUnique(
      { where: { databaseId: ctx.currentUserData.databaseId } },
    );
  },
});
