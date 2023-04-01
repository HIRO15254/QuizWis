import {
  mutationField,
} from 'nexus';

export const leaveRoomMutation = mutationField('leaveRoom', {
  type: 'Room',
  async resolve(_parent, _input, ctx) {
    if (!ctx.currentUserData) {
      throw new Error('ログインしていません');
    }
    if (!ctx.currentUserData.roomId) {
      throw new Error('ルームに参加していません');
    }
    const ret = await ctx.prisma.room.update({
      where: {
        databaseId: ctx.currentUserData.roomId,
      },
      data: {
        users: {
          disconnect: {
            databaseId: ctx.currentUserData.databaseId,
          },
        },
      },
    });
    return ret;
  },
});
