import {
  mutationField, nonNull, arg, inputObjectType,
} from 'nexus';

export const createUserDataInput = inputObjectType({
  name: 'CreateUserDataInput',
  definition(t) {
    t.nonNull.id('authUserId');
    t.nonNull.string('userId');
    t.nonNull.string('name');
    t.string('bio');
  },
});

export const createUserDataMutation = mutationField('createUserData', {
  type: 'UserData',
  args: {
    input: nonNull(arg({ type: 'CreateUserDataInput' })),
  },
  async resolve(_parent, { input }, ctx) {
    await ctx.prisma.user.update({
      where: { id: input.authUserId },
      data: {
        userData: {
          create: {
            userId: input.userId,
            name: input.name,
            bio: input.bio ?? undefined,
          },
        },
      },
    });
    const ret = await ctx.prisma.userData.findUnique({
      where: { userId: input.userId },
    });
    return ret;
  },
});
