import {
  nonNull, arg, mutationField, inputObjectType,
} from 'nexus';

export const updateUserDataInput = inputObjectType({
  name: 'UpdateUserDataInput',
  definition(t) {
    t.nonNull.string('userId');
    t.string('newUserId');
    t.string('name');
    t.string('email');
    t.string('bio');
    t.string('iconUrl');
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
        userId: input.newUserId ?? undefined,
        name: input.name ?? undefined,
        email: input.email ?? undefined,
        bio: input.bio ?? undefined,
        iconUrl: input.iconUrl ?? undefined,
      },
    });
  },
});
