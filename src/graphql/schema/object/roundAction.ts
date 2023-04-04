import { objectType } from 'nexus';
import { RoundAction } from 'nexus-prisma';

export const roundActionObject = objectType({
  name: RoundAction.$name,
  description: RoundAction.$description,
  definition(t) {
    t.implements('Node');
    t.field(RoundAction.databaseId);
    t.field(RoundAction.round);
    t.field(RoundAction.actionUser);
    t.field(RoundAction.targetUser);
    t.field(RoundAction.actionType);

    t.field(RoundAction.prevAction);
    t.field(RoundAction.nextAction);
    t.field(RoundAction.isCurrent);

    t.field(RoundAction.createdAt);
    t.field(RoundAction.updatedAt);
    t.nonNull.id('id', {
      resolve: (parent, _args, _ctx) => Buffer.from(`RoundAction:${parent.databaseId}`).toString('base64'),
    });
  },
});
