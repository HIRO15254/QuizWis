import { RuleType } from '@prisma/client';
import { enumType } from 'nexus';

export const ruleType = enumType({
  name: 'RuleType',
  members: Object.values(RuleType),
});
