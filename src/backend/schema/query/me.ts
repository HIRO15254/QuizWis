import { pothosBuilder } from '../builder';
import { UserData } from '../object/UserData';

pothosBuilder.queryField('Me', (t) => t.prismaField({
  type: UserData,
  resolve: async (query, _root, _args, ctx, _info) => ctx.prisma.userData.findUniqueOrThrow({
    ...query,
    where: { databaseId: ctx.currentUserData?.databaseId ?? '' },
  }),
}));
