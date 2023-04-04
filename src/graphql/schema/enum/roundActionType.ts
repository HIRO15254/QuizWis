import { RoundActionType } from '@prisma/client';
import { enumType } from 'nexus';

export const roundActionType = enumType({
  name: 'RoundActionType',
  members: Object.values(RoundActionType),
});
