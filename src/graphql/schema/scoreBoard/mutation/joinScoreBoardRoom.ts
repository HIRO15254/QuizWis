import bcrypt from 'bcrypt';
import {
  mutationField, nonNull, arg, inputObjectType,
} from 'nexus';

export const joinScoreBoardRoomInput = inputObjectType({
  name: 'JoinScoreBoardRoomInput',
  definition(t) {
    t.nonNull.string('databaseId');
    t.string('password');
  },
});

export const joinScoreBoardRoomMutation = mutationField('joinScoreBoardRoom', {
  type: 'ScoreBoardRoom',
  args: {
    input: nonNull(arg({ type: 'JoinScoreBoardRoomInput' })),
  },
  resolve: async (_parent, { input }, ctx) => {
    const ret = await ctx.prisma.$transaction(async () => {
      // ログインしていなければエラー
      if (!ctx.currentUserData) throw new Error('ログインしていません');
      // ルームが存在しなければエラー
      const room = await ctx.prisma.scoreBoardRoom.findUnique({
        where: {
          databaseId: input.databaseId,
        },
      });
      if (!room) throw new Error('存在しないルームへの参加です');
      // パスワードが違えばエラー
      if (room.hashedPassword && !bcrypt.compareSync(input.password ?? '', room.hashedPassword)) {
        throw new Error('パスワードが違います');
      }
      // すでに参加していればエラー
      const connection = await ctx.prisma.user_ScoreBoardRoom.findFirst({
        where: {
          userDataId: ctx.currentUserData.databaseId,
          scoreBoardRoomId: room.databaseId,
        },
      });
      if (connection) throw new Error('すでに参加しています');
      // 参加
      return ctx.prisma.scoreBoardRoom.update({
        where: {
          databaseId: room.databaseId,
        },
        data: {
          users: {
            create: {
              userData: {
                connect: {
                  databaseId: ctx.currentUserData.databaseId,
                },
              },
              role: 'MEMBER',
            },
          },
        },
      });
    });
    return ret;
  },
});
