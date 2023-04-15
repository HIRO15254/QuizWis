import {
  queryField, nonNull, inputObjectType, arg,
} from 'nexus';

export const getUserDataInput = inputObjectType({
  name: 'GetUserDataInput',
  definition(t) {
    t.nonNull.string('userId');
  },
});

export const getUserDataQuery = queryField('getUserData', {
  type: 'UserData',
  args: {
    input: nonNull(arg({ type: 'GetUserDataInput' })),
  },
  resolve(_parent, args, ctx) {
    const res = ctx.prisma.userData.findUnique({
      where: {
        userId: args.input.userId,
      },
    });
    return res;
  },
});
