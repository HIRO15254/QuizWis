import { objectType } from 'nexus';
import { Round } from 'nexus-prisma';

export const RoundObject = objectType({
  name: Round.$name,
  description: Round.$description,
  definition(t) {
    t.implements('Node');
    t.field(Round.databaseId);
    t.field(Round.rule);
    t.field(Round.actions);
    t.field(Round.room);
    t.field(Round.isCurrent);
    t.field(Round.createdAt);
    t.field(Round.updatedAt);
    t.nonNull.id('id', {
      resolve: (parent, _args, _ctx) => Buffer.from(`Round:${parent.databaseId}`).toString('base64'),
    });
  },
});
