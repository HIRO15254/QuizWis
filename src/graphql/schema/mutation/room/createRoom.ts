import {
  mutationField, nonNull, arg, inputObjectType,
} from 'nexus';

export const createRoomInput = inputObjectType({
  name: 'CreateRoomInput',
  definition(t) {
    t.nonNull.string('name');
    t.string('password');
  },
});

export const createRoomMutation = mutationField('createRoom', {
  type: 'Room',
  args: {
    input: nonNull(arg({ type: 'CreateRoomInput' })),
  },
  async resolve(_parent, { input }, ctx) {
    if (!ctx.currentUserData) {
      throw new Error('ログインしていません');
    }
    const hashedPassword = input.password ? await ctx.hash(input.password) : undefined;
    const ret = await ctx.prisma.room.create({
      data: {
        name: input.name,
        hashedPassword,
        users: {
          connect: {
            databaseId: ctx.currentUserData.databaseId,
          },
        },
      },
    });
    return ret;
  },
});
