import { interfaceType } from 'nexus';

export const rule = interfaceType({
  name: 'Rule',
  definition(t) {
    t.field('databaseId');
    t.field('createdAt');
    t.field('updatedAt');

    t.string('name', { resolve: (parent) => parent.name });
    t.nonNull.field('ruleType', { type: 'RuleType', resolve: (parent) => parent.ruleType });
    t.int('questionLimit', { resolve: (parent) => parent.questionLimit });
    t.field('timeLimit', { type: 'DateTime', resolve: (parent) => parent.timeLimit });
  },
});
