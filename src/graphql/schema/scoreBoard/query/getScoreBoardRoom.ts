import {
  arg, inputObjectType, nonNull, queryField,
} from 'nexus';

export const getScoreBoardRoomInput = inputObjectType({
  name: 'GetScoreBoardRoomInput',
  definition(t) {
    t.nonNull.string('databaseId');
  },
});

export const getScoreBoardRoom = queryField('getScoreBoardRoom', {
  type: 'ScoreBoardRoom',
  args: {
    input: nonNull(arg({ type: 'GetScoreBoardRoomInput' })),
  },
  async resolve(_parent, { input }, ctx) {
    const ret = ctx.prisma.$transaction(async () => {
      if (!ctx.currentUserData) throw new Error('ログインしていません');
      return ctx.prisma.scoreBoardRoom.findUnique({
        where: {
          databaseId: input.databaseId,
        },
      });
    });
    return ret;
  },
});
