import { prisma } from '../../lib/prisma';
import { pothosBuilder } from '../builder';
import { UserData } from '../object/UserData';

const SwitchDarkThemeInput = pothosBuilder.inputType(
  'SwitchDarkThemeInput',
  {
    fields: (t) => ({
      databaseId: t.string(),
    }),
  },
);

pothosBuilder.mutationField(
  'switchDarkTheme',
  (t) => t.prismaField({
    type: UserData,
    args: {
      input: t.arg({ type: SwitchDarkThemeInput }),
    },
    resolve: async (_query, _root, args, ctx, _info) => {
      const ret = await prisma.$transaction(async () => {
        if (!ctx.currentUserData) {
          throw new Error(`ログインしていません。${ctx.currentUserData}`);
        }
        if (args.input?.databaseId && !ctx.currentUserData.isAdmin) {
          throw new Error('権限がありません。');
        }
        const targetDatabaseId = args.input?.databaseId ?? ctx.currentUserData.databaseId;
        const targetUserData = await prisma.userData.findUniqueOrThrow({
          where: {
            databaseId: targetDatabaseId,
          },
        }).catch(() => {
          throw new Error('ユーザーデータが見つかりません。');
        });
        return prisma.userData.update({
          where: {
            databaseId: targetDatabaseId,
          },
          data: {
            isDarkTheme: !targetUserData.isDarkTheme,
          },
        });
      });
      return ret;
    },
  }),
);
