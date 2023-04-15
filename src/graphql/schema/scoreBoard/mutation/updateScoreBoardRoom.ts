import {
  mutationField, nonNull, arg, inputObjectType,
} from 'nexus';

export const updateScoreBoardRoomInput = inputObjectType({
  name: 'UpdateScoreBoardRoomInput',
  definition(t) {
    t.nonNull.string('databaseId');
    t.string('name');
  },
});

export const updateScoreBoardRoomMutation = mutationField('updateScoreBoardRoom', {
  type: 'ScoreBoardRoom',
  args: {
    input: nonNull(arg({ type: 'UpdateScoreBoardRoomInput' })),
  },
  resolve: async (_parent, { input }, ctx) => {
    const ret = await ctx.prisma.$transaction(async () => {
      if (!ctx.currentUserData) throw new Error('ログインしていません');
      const room = await ctx.prisma.scoreBoardRoom.findUnique({
        where: {
          databaseId: input.databaseId,
        },
      });
      if (!room) throw new Error('更新しようとしているルームが存在しません');
      const connection = await ctx.prisma.user_ScoreBoardRoom.findFirst({
        where: {
          userDataId: ctx.currentUserData.databaseId,
          scoreBoardRoomId: room.databaseId,
        },
      });
      if (!connection) throw new Error('更新しようとしているルームに参加していません');
      if (connection.role !== 'OWNER') throw new Error('自分がオーナーではないルームを更新することはできません');
      const res = await ctx.prisma.scoreBoardRoom.update({
        where: {
          databaseId: input.databaseId,
        },
        data: {
          name: input.name || undefined,
        },
      });
      return res;
    });
    return ret;
  },
});
