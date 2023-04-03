import {
  queryField, nonNull, inputObjectType, arg,
} from 'nexus';

export const getRoomInput = inputObjectType({
  name: 'GetRoomInput',
  definition(t) {
    t.nonNull.string('databaseId');
  },
});

export const getRoomQuery = queryField('getRoom', {
  type: 'Room',
  args: {
    input: nonNull(arg({ type: 'GetRoomInput' })),
  },
  async resolve(_parent, args, ctx) {
    const res = await ctx.prisma.room.findUnique({
      where: {
        databaseId: args.input.databaseId,
      },
    });
    return res;
  },
});
