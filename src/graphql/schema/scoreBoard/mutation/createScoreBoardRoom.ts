import {
  mutationField, nonNull, arg, inputObjectType,
} from 'nexus';

export const createScoreBoardRoomInput = inputObjectType({
  name: 'CreateScoreBoardRoomInput',
  definition(t) {
    t.nonNull.string('name');
    t.string('password');
  },
});

export const createScoreBoardRoomMutation = mutationField('createScoreBoardRoom', {
  description: '得点表示ルームを作成しオーナーになる',
  type: 'ScoreBoardRoom',
  args: {
    input: nonNull(arg({ type: 'CreateScoreBoardRoomInput' })),
  },
  resolve: async (_parent, { input }, ctx) => {
    const ret = await ctx.prisma.$transaction(async () => {
      if (!ctx.currentUserData) throw new Error('ログインしていません');
      const r = await ctx.prisma.scoreBoardRoom.create({
        data: {
          name: input.name,
          hashedPassword: input.password ? await ctx.hash(input.password) : null,
          users: {
            create: {
              userData: {
                connect: {
                  databaseId: ctx.currentUserData.databaseId,
                },
              },
              role: 'OWNER',
            },
          },
        },
      });
      return r;
    });
    return ret;
  },
});
