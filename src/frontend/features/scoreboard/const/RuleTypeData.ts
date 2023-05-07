import { RuleType } from '@prisma/client';

export type RuleTypeDataType = {
  name: string;
  value: string;
  label: string;
  description: string;
};

const RuleTypesData: RuleTypeDataType[] = [
  {
    value: RuleType.FREE as string,
    label: 'Free',
    name: 'Free',
    description: '正誤数のみを表示する、いわゆるフリーバッティングです。',
  },
];

export default RuleTypesData;
