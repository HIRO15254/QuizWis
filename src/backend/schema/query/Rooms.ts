import { pothosBuilder } from '../builder';
import { Room } from '../object/Room';

const DEFAULT_TAKE = 20;

const RoomsInput = pothosBuilder.inputType(
  'RoomsInput',
  {
    fields: (t) => ({
      skip: t.int(),
      take: t.int(),
    }),
  },
);

pothosBuilder.queryField('Rooms', (t) => t.prismaField({
  type: [Room],
  args: {
    input: t.arg({ type: RoomsInput }),
  },
  resolve: async (query, _root, args, ctx, _info) => {
    if (!ctx.currentUserData) {
      throw new Error('ログインしていません');
    }
    return prisma.room.findMany({
      ...query,
      skip: args.input?.skip ?? 0,
      take: args.input?.take ?? DEFAULT_TAKE,
    });
  },
}));
