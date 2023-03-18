import {
  nonNull, arg, mutationField, inputObjectType,
} from 'nexus';

export const updateUserDataInput = inputObjectType({
  name: 'UpdateUserDataInput',
  definition(t) {
    t.nonNull.string('userId');
    t.nonNull.string('name');
    t.string('bio');
  },
});

/**
 * ユーザー情報を更新するMutation
 * 変更していいのはADMINか、自分自身のみ
 */
export const updateUserDataMutation = mutationField('updateUserData', {
  type: 'UserData',
  args: {
    input: nonNull(arg({ type: 'UpdateUserDataInput' })),
  },
  resolve(_parent, { input }, ctx) {
    if (!ctx.currentUserData) throw new Error('認証されていません。');
    if (
      (ctx.currentUserData?.userId !== input.userId)
      && (!ctx.currentUserData?.isAdmin)
    ) {
      throw new Error('権限がありません。');
    }
    return ctx.prisma.userData.update({
      where: {
        userId: input.userId,
      },
      data: {
        name: input.name,
        bio: input.bio ?? undefined,
      },
    });
  },
});
