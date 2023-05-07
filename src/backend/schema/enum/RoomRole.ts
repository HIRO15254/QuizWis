import { RoomRole as def } from '@prisma/client';

import { pothosBuilder } from '../builder';

export const RoomRole = pothosBuilder.enumType(def, {
  name: 'RoomRole',
});
