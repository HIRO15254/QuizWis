import { objectType } from 'nexus';
import { Rule } from 'nexus-prisma';

export const exportNameObject = objectType({
  name: 'FreeRule',
  description: 'フリバのルールを表すオブジェクト',
  definition(t) {
    t.implements('Node');
    t.implements('Rule');
    t.nonNull.string(Rule.databaseId);

    t.nonNull.id('id', {
      resolve: (parent, _args, _ctx) => Buffer.from(`PrismaTypeName:${parent.databaseId}`).toString('base64'),
    });
  },
});
