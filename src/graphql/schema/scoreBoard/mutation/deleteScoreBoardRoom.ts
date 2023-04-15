import {
  mutationField, nonNull, arg, inputObjectType,
} from 'nexus';

export const deleteScoreBoardRoomInput = inputObjectType({
  name: 'DeleteScoreBoardRoomInput',
  definition(t) {
    t.nonNull.string('databaseId');
  },
});

export const deleteScoreBoardRoomMutation = mutationField('deleteScoreBoardRoom', {
  description: '自分がオーナーである得点表示ルームを削除する',
  type: 'ScoreBoardRoom',
  args: {
    input: nonNull(arg({ type: 'DeleteScoreBoardRoomInput' })),
  },
  resolve: async (_parent, { input }, ctx) => {
    const { databaseId } = input;
    const ret = await ctx.prisma.$transaction(async () => {
      if (!ctx.currentUserData) throw new Error('ログインしていません');
      const room = await ctx.prisma.scoreBoardRoom.findUnique({
        where: {
          databaseId,
        },
      });
      if (!room) throw new Error('削除しようとしているルームが存在しません');
      const connection = await ctx.prisma.user_ScoreBoardRoom.findFirst({
        where: {
          userDataId: ctx.currentUserData.databaseId,
          scoreBoardRoomId: room.databaseId,
        },
      });
      if (!connection) throw new Error('削除しようとしているルームに参加していません');
      if (connection.role !== 'OWNER') throw new Error('自分がオーナーではないルームを削除することはできません');
      const res = await ctx.prisma.scoreBoardRoom.delete({
        where: {
          databaseId,
        },
      });
      return res;
    });
    return ret;
  },
});
