import { prisma } from '../../lib/prisma';
import { pothosBuilder } from '../builder';
import { Room } from '../object/Room';

const RoomInput = pothosBuilder.inputType(
  'RoomInput',
  {
    fields: (t) => ({
      databaseId: t.string({ required: true }),
    }),
  },
);

pothosBuilder.queryField(
  'room',
  (t) => t.prismaField({
    type: Room,
    args: {
      input: t.arg({ type: RoomInput, required: true }),
    },
    resolve: async (query, _root, args, ctx, _info) => {
      if (!ctx.currentUserData) {
        throw new Error('ログインしていません');
      }
      return prisma.room.findUniqueOrThrow({
        ...query,
        where: {
          databaseId: args.input.databaseId,
        },
      }).catch(() => {
        throw new Error('ルームが見つかりません');
      });
    },
  }),
);
