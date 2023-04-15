import { mutationField } from 'nexus';

export const switchDarkThemeMutation = mutationField('switchDarkTheme', {
  type: 'UserData',
  async resolve(_parent, _input, ctx) {
    if (!ctx.currentUserData) {
      throw new Error('ログインしていません。');
    }

    const ret = await ctx.prisma.userData.update({
      where: {
        userId: ctx.currentUserData.userId,
      },
      data: {
        isDarkTheme: !ctx.currentUserData.isDarkTheme,
      },
    });

    return ret;
  },
});
