import {
  mutationField, nonNull, arg, inputObjectType,
} from 'nexus';

export const leaveScoreBoardRoomInput = inputObjectType({
  name: 'LeaveScoreBoardRoomInput',
  definition(t) {
    t.nonNull.string('databaseId');
  },
});

export const leaveScoreBoardRoomMutation = mutationField('leaveScoreBoardRoom', {
  description: '現在ログインしているアカウンを得点表示ルームから退出させる',
  type: 'ScoreBoardRoom',
  args: {
    input: nonNull(arg({ type: 'LeaveScoreBoardRoomInput' })),
  },
  resolve: async (_parent, { input }, ctx) => {
    const ret = await ctx.prisma.$transaction(async () => {
      if (!ctx.currentUserData) throw new Error('ログインしていません');
      const room = await ctx.prisma.scoreBoardRoom.findUnique({
        where: {
          databaseId: input.databaseId,
        },
      });
      if (!room) throw new Error('存在しないルームから退出しようとしています');
      const connection = await ctx.prisma.user_ScoreBoardRoom.findFirst({
        where: {
          userDataId: ctx.currentUserData.databaseId,
          scoreBoardRoomId: room.databaseId,
        },
      });
      if (!connection) throw new Error('退出しようとしているルームに参加していません');
      const owners = await ctx.prisma.user_ScoreBoardRoom.findMany({
        where: {
          scoreBoardRoomId: room.databaseId,
          role: 'OWNER',
        },
      });
      if (owners.length === 1) throw new Error('ルームのオーナーが1人の場合、オーナーは退出できません');
      await ctx.prisma.user_ScoreBoardRoom.delete({
        where: {
          databaseId: connection.databaseId,
        },
      });
      return room;
    });
    return ret;
  },
});
