import { objectType } from 'nexus';
import { Rule } from 'nexus-prisma';

export const ruleObject = objectType({
  name: Rule.$name,
  description: Rule.$description,
  definition(t) {
    t.implements('Node');
    t.field(Rule.databaseId);
    t.field(Rule.ruleType);
    t.field(Rule.params);
    t.field(Rule.rounds);
    t.field(Rule.createdAt);
    t.field(Rule.updatedAt);
    t.nonNull.id('id', {
      resolve: (parent, _args, _ctx) => Buffer.from(`Rule:${parent.databaseId}`).toString('base64'),
    });
  },
});
