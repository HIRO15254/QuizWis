import { prisma } from '../../lib/prisma';
import { pothosBuilder } from '../builder';
import { UserData } from '../object/UserData';

const UserDataInput = pothosBuilder.inputType(
  'UserDataInput',
  {
    fields: (t) => ({
      databaseId: t.string(),
      userId: t.string(),
    }),
  },
);

pothosBuilder.queryField('UserData', (t) => t.prismaField({
  type: UserData,
  args: {
    input: t.arg({ type: UserDataInput }),
  },
  resolve: async (query, _root, args, _ctx, _info) => {
    if (args.input?.databaseId) {
      return prisma.userData.findUniqueOrThrow({
        ...query,
        where: {
          databaseId: args.input?.databaseId ?? '',
        },
      }).catch(() => {
        throw new Error('ユーザーデータが見つかりません。');
      });
    } if (args.input?.userId) {
      return prisma.userData.findUniqueOrThrow({
        ...query,
        where: {
          userId: args.input?.userId ?? '',
        },
      }).catch(() => {
        throw new Error('ユーザーデータが見つかりません。');
      });
    }
    throw new Error('引数が不正です。');
  },
}));
