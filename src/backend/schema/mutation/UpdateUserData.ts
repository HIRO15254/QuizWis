import { prisma } from '../../lib/prisma';
import { pothosBuilder } from '../builder';
import { UserData } from '../object/UserData';

const UpdateUserDataInput = pothosBuilder.inputType(
  'UpdateUserDataInput',
  {
    fields: (t) => ({
      databaseId: t.string(),
      userId: t.string(),
      name: t.string(),
      bio: t.string(),
      email: t.string(),
      iconUrl: t.string(),
      isDarkTheme: t.boolean(),
    }),
  },
);

pothosBuilder.mutationField(
  'updateUserData',
  (t) => t.prismaField({
    type: UserData,
    args: {
      input: t.arg({ type: UpdateUserDataInput }),
    },
    resolve: async (_query, _root, args, ctx, _info) => prisma.$transaction(async () => {
      if (!ctx.currentUserData) {
        throw new Error(`ログインしていません。${ctx.currentUserData}`);
      }
      if (args.input?.databaseId) {
        if (!ctx.currentUserData.isAdmin) {
          throw new Error('権限がありません。');
        }
        await prisma.userData.findUniqueOrThrow({
          where: {
            databaseId: args.input?.databaseId,
          },
        }).catch(() => {
          throw new Error('ユーザーデータが見つかりません。');
        });
      }
      const targetDatabaseId = args.input?.databaseId ?? ctx.currentUserData.databaseId;
      return prisma.userData.update({
        where: {
          databaseId: targetDatabaseId,
        },
        data: {
          userId: args.input?.userId ?? undefined,
          name: args.input?.name ?? undefined,
          bio: args.input?.bio,
          email: args.input?.email,
          iconUrl: args.input?.iconUrl,
        },
      }).catch((e) => {
        throw new Error(`ユーザーデータの更新に失敗しました。${e}`);
      });
    }),
  }),
);
