import {
  mutationField, nonNull, arg, inputObjectType,
} from 'nexus';

export const joinRoomInput = inputObjectType({
  name: 'JoinRoomInput',
  definition(t) {
    t.nonNull.string('databaseId');
    t.string('password');
  },
});

export const joinRoomMutation = mutationField('joinRoom', {
  type: 'Room',
  args: {
    input: nonNull(arg({ type: 'JoinRoomInput' })),
  },
  async resolve(_parent, { input }, ctx) {
    const hashedPassword = input.password ? await ctx.hash(input.password) : undefined;
    return ctx.prisma.$transaction(async (prisma) => {
      const target = await prisma.room.findUnique({
        where: {
          databaseId: input.databaseId,
        },
      });
      if (!target) {
        throw new Error('存在しないルームへの入室です');
      }
      if (!ctx.currentUserData) {
        throw new Error('ログインしていません');
      }
      if (ctx.currentUserData.roomId !== null) {
        throw new Error('一度に複数のルームに入室することはできません');
      }
      if (target.hashedPassword !== hashedPassword) {
        throw new Error('パスワードが違います');
      }
      const ret = await prisma.room.update({
        where: {
          databaseId: input.databaseId,
        },
        data: {
          users: {
            connect: {
              databaseId: ctx.currentUserData.databaseId,
            },
          },
        },
      });
      return ret;
    });
  },
});
