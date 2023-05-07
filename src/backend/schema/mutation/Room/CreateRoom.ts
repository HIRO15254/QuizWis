import { hash } from '../../../lib/crypto';
import { pothosBuilder } from '../../builder';
import { Room } from '../../object/Room';

const CreateRoomInput = pothosBuilder.inputType(
  'CreateRoomInput',
  {
    fields: (t) => ({
      name: t.string({ required: true }),
      password: t.string(),
    }),
  },
);

pothosBuilder.mutationField(
  'CreateRoom',
  (t) => t.prismaField({
    type: Room,
    args: {
      input: t.arg({ type: CreateRoomInput, required: true }),
    },
    resolve: async (_query, _root, args, ctx, _info) => {
      if (!ctx.currentUserData) {
        throw new Error('ログインしていません');
      }
      return prisma.room.create({
        data: {
          name: args.input.name,
          hashedPassword: args.input.password ? hash(args.input.password) : null,
          users: {
            create: {
              userData: {
                connect: {
                  databaseId: ctx.currentUserData.databaseId,
                },
              },
              role: 'OWNER',
            },
          },
        },
      });
    },
  }),
);
