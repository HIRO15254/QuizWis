import { objectType } from 'nexus';
import { Action } from 'nexus-prisma';

export const actionObject = objectType({
  name: Action.$name,
  description: Action.$description,
  definition(t) {
    t.implements('Node');
    t.field(Action.databaseId);
    t.field(Action.rule);
    t.field(Action.actionUser);
    t.field(Action.targetUser);
    t.field(Action.actionType);
    t.field(Action.createdAt);
    t.field(Action.updatedAt);
    t.nonNull.id('id', {
      resolve: (parent, _args, _ctx) => Buffer.from(`Action:${parent.databaseId}`).toString('base64'),
    });
  },
});
