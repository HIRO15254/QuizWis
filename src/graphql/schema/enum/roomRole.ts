import { RoomRole } from '@prisma/client';
import { enumType } from 'nexus';

export const roomRole = enumType({
  name: 'RoomRole',
  members: Object.values(RoomRole),
});
