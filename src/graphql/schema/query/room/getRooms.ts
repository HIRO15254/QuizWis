import {
  queryField, nonNull, inputObjectType, arg, list,
} from 'nexus';

export const getRoomsInput = inputObjectType({
  name: 'GetRoomsInput',
  definition(t) {
    t.boolean('isActive');
  },
});

export const getRoomsQuery = queryField('getRooms', {
  type: list('Room'),
  args: {
    input: nonNull(arg({ type: 'GetRoomsInput' })),
  },
  async resolve(_parent, args, ctx) {
    const res = await ctx.prisma.room.findMany({
      where: {
        isActive: args.input.isActive ?? undefined,
      },
    });
    return res;
  },
});
