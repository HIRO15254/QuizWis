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
    const ret = await ctx.prisma.userData.create({
      data: {
        userId: input.userId,
        name: input.name,
        bio: input.bio ?? undefined,
      },
    });
    await ctx.prisma.user.update({
      where: { id: input.authUserId },
      data: {
        userData: {
          connect: {
            userId: input.userId,
          },
        },
      },
    });
    return ret;
  },
});
