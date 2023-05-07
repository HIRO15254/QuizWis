import { prisma } from '../../../lib/prisma';
import { pothosBuilder } from '../../builder';
import { Room } from '../../object/Room';

const LeaveRoomInput = pothosBuilder.inputType(
  'LeaveRoomInput',
  {
    fields: (t) => ({
      roomId: t.string(),
    }),
  },
);

pothosBuilder.mutationField(
  'leaveRoom',
  (t) => t.prismaField({
    type: Room,
    args: {
      input: t.arg({ type: LeaveRoomInput, required: true }),
    },
    resolve: async (_query, _root, args, ctx, _info) => {
      if (!ctx.currentUserData) {
        throw new Error('ログインしていません');
      }
      prisma.user_Room.delete({
        where: {
          userDataId_roomId: {
            userDataId: ctx.currentUserData?.userId ?? '',
            roomId: args.input.roomId ?? '',
          },
        },
      }).catch(() => {
        throw new Error('ルームからの退出に失敗しました');
      });
      return prisma.room.findUniqueOrThrow({
        where: {
          databaseId: args.input.roomId ?? '',
        },
      });
    },
  }),
);
