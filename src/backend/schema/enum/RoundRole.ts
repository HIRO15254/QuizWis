import { RoundRole as def } from '@prisma/client';

import { pothosBuilder } from '../builder';

export const RoundRole = pothosBuilder.enumType(def, {
  name: 'RoundRole',
});
