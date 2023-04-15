import { queryField, stringArg, nonNull } from 'nexus';

export const nodeQuery = queryField('node', {
  type: 'Node',
  args: {
    id: nonNull(stringArg()),
  },
  // BUG:なぜか型が一致しないと出る。実装的には問題ないはず
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  resolve(_parent, { id }, ctx) {
    const idStr = Buffer.from(id, 'base64').toString();
    const [type, databaseId] = idStr.split(':');
    if (type === 'UserData') {
      const res = ctx.prisma.userData.findUnique({ where: { databaseId } });
      return res ? { ...res, __typename: 'UserData' } : null;
    }
    return null;
  },
});
