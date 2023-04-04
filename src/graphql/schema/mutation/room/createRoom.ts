import { RuleType, RuleActionType } from '@prisma/client';
import {
  mutationField, nonNull, arg, inputObjectType,
} from 'nexus';

export const createRoomInput = inputObjectType({
  name: 'CreateRoomInput',
  definition(t) {
    t.nonNull.string('name');
    t.string('password');
  },
});

export const createRoomMutation = mutationField('createRoom', {
  type: 'Room',
  args: {
    input: nonNull(arg({ type: 'CreateRoomInput' })),
  },
  async resolve(_parent, { input }, ctx) {
    const hashedPassword = input.password ? await ctx.hash(input.password) : undefined;
    return ctx.prisma.$transaction(async () => {
      if (!ctx.currentUserData) {
        throw new Error('ログインしていません');
      }
      const ret = await ctx.prisma.room.create({
        data: {
          name: input.name,
          hashedPassword,
          users: {
            connect: {
              databaseId: ctx.currentUserData.databaseId,
            },
          },
          rules: {
            create: {
              ruleType: RuleType.FREE,
              actions: {
                create: {
                  actionType: RuleActionType.JOIN,
                  actionUser: {
                    connect: {
                      databaseId: ctx.currentUserData.databaseId,
                    },
                  },
                  targetUser: {
                    connect: {
                      databaseId: ctx.currentUserData.databaseId,
                    },
                  },
                },
              },
            },
          },
        },
      });
      return ret;
    });
  },
});
