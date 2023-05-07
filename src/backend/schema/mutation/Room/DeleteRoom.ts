import { checkRoomPrivilege } from './checkRoomPrivilege';
import { prisma } from '../../../lib/prisma';
import { pothosBuilder } from '../../builder';
import { Room } from '../../object/Room';

const DeleteRoomInput = pothosBuilder.inputType(
  'DeleteRoomInput',
  {
    fields: (t) => ({
      databaseId: t.string({ required: true }),
    }),
  },
);

pothosBuilder.mutationField(
  'deleteRoom',
  (t) => t.prismaField({
    type: Room,
    args: {
      input: t.arg({ type: DeleteRoomInput, required: true }),
    },
    resolve: async (_query, _root, args, ctx, _info) => {
      if (!ctx.currentUserData) {
        throw new Error('ログインしていません');
      }
      if (!await checkRoomPrivilege({
        userDatabaseId: ctx.currentUserData.databaseId,
        roomDatabaseId: args.input.databaseId,
        requiredRole: 'OWNER',
      })) {
        throw new Error('ルームの削除権限がありません');
      }
      return prisma.room.delete({
        where: {
          databaseId: args.input.databaseId,
        },
      });
    },
  }),
);
