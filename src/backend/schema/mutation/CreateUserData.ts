import { prisma } from '../../lib/prisma';
import { pothosBuilder } from '../builder';
import { UserData } from '../object/UserData';

const CreateUserDataInput = pothosBuilder.inputType(
  'CreateUserDataInput',
  {
    fields: (t) => ({
      authUserId: t.string({ required: true }),
      userId: t.string({ required: true }),
      name: t.string({ required: true }),
    }),
  },
);

pothosBuilder.mutationField(
  'createUserData',
  (t) => t.prismaField({
    type: UserData,
    args: {
      input: t.arg({ type: CreateUserDataInput, required: true }),
    },
    resolve: async (_query, _root, args, _ctx, _info) => prisma.userData.create({
      data: {
        userId: args.input.userId,
        name: args.input.name,
        authUser: {
          connect: {
            id: args.input.authUserId,
          },
        },
      },
    }),
  }),
);
