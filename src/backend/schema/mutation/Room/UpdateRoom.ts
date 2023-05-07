import { checkRoomPrivilege } from './checkRoomPrivilege';
import { hash } from '../../../lib/crypto';
import { pothosBuilder } from '../../builder';
import { Room } from '../../object/Room';

const updateRoomInput = pothosBuilder.inputType(
  'UpdateRoomInput',
  {
    fields: (t) => ({
      databaseId: t.string({ required: true }),
      name: t.string(),
      password: t.string(),
    }),
  },
);

pothosBuilder.mutationField(
  'updateRoom',
  (t) => t.prismaField({
    type: Room,
    args: {
      input: t.arg({ type: updateRoomInput, required: true }),
    },
    resolve: async (_query, _root, args, ctx, _info) => {
      if (!ctx.currentUserData) {
        throw new Error('ログインしていません');
      }
      // 権限チェック
      if (await checkRoomPrivilege({
        userDatabaseId: ctx.currentUserData.databaseId,
        roomDatabaseId: args.input.databaseId,
        requiredRole: 'OWNER',
      })) {
        throw new Error('ルームの編集権限がありません');
      }
      // パスワードのハッシュ化
      let newHashedPassword;
      if (args.input.password) {
        newHashedPassword = hash(args.input.password);
      } else {
        newHashedPassword = args.input.password;
      }
      // 実際の処理
      return prisma.room.update({
        where: {
          databaseId: args.input.databaseId,
        },
        data: {
          name: args.input.name ?? undefined,
          hashedPassword: newHashedPassword,
        },
      });
    },
  }),
);
