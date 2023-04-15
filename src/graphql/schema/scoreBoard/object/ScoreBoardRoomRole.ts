import { ScoreBoardRoomRole } from '@prisma/client';
import { enumType } from 'nexus';

export const scoreBoardRoomRole = enumType({
  name: 'ScoreBoardRoomRole',
  members: Object.values(ScoreBoardRoomRole),
});
