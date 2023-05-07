import { compare } from '../../../lib/crypto';
import { prisma } from '../../../lib/prisma';
import { pothosBuilder } from '../../builder';
import { Room } from '../../object/Room';

const JoinRoomInput = pothosBuilder.inputType(
  'JoinRoomInput',
  {
    fields: (t) => ({
      roomId: t.string({ required: true }),
      password: t.string(),
    }),
  },
);

pothosBuilder.mutationField(
  'joinRoom',
  (t) => t.prismaField({
    type: Room,
    args: {
      input: t.arg({ type: JoinRoomInput, required: true }),
    },
    resolve: async (_query, _root, args, ctx, _info) => {
      // ログインチェック
      if (!ctx.currentUserData) {
        throw new Error('ログインしていません');
      }
      // パスワード確認
      const room = await prisma.room.findUniqueOrThrow({
        where: {
          databaseId: args.input.roomId,
        },
      }).catch(() => {
        throw new Error('ルームが存在しません');
      });
      // 権限チェック
      if (!ctx.currentUserData?.isAdmin) {
        if (room.hashedPassword && !compare(args.input.password ?? '', room.hashedPassword)) {
          throw new Error('パスワードが間違っています');
        }
      }

      // 実際の処理
      return prisma.room.update({
        where: {
          databaseId: args.input.roomId,
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
      }).catch((e) => {
        if (e instanceof Error) {
          throw new Error(`ルームへの参加に失敗しました: ${e.message}`);
        } else {
          throw new Error('ルームへの参加に失敗しました');
        }
      });
    },
  }),
);
