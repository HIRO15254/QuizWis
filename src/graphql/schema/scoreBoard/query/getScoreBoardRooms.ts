import {
  arg, inputObjectType, list, queryField,
} from 'nexus';

export const getScoreBoardRoomsInput = inputObjectType({
  name: 'GetScoreBoardRoomsInput',
  definition(t) {
    t.string('dummy');
  },
});

export const getScoreBoardRooms = queryField('getScoreBoardRooms', {
  description: '得点表示ルーム一覧を取得する',
  type: list('ScoreBoardRoom'),
  args: {
    input: arg({ type: 'GetScoreBoardRoomsInput' }),
  },
  resolve: async (_parent, _input, ctx) => {
    const ret = await ctx.prisma.$transaction(async () => {
      if (!ctx.currentUserData) throw new Error('ログインしていません');
      return ctx.prisma.scoreBoardRoom.findMany();
    });
    return ret;
  },
});
