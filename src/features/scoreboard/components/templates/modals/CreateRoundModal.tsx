import {
  Button, Group, Modal, NumberInput, Select, Switch, Text,
} from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import React, { forwardRef, useState } from 'react';

import RuleTypesData, { RuleTypeDataType } from '../../../const/RuleTypeData';

type CreateRoundModalProps = {
  opened: boolean;
  onClose: () => void;
  onSubmit: (values: CreateRoundFormType) => void;
};

export type CreateRoundFormType = {
  ruleType: string
};

// eslint-disable-next-line react/display-name
const SelectItem = forwardRef<HTMLDivElement, RuleTypeDataType>(
  ({ name, ...others }: RuleTypeDataType, ref) => (
    <div ref={ref} {...others}>
      <Text size="sm" weight={500}>
        {name}
      </Text>
    </div>
  ),
);

const CreateRoundModal = (props: CreateRoundModalProps) => {
  const { opened, onClose, onSubmit } = props;
  const [questionLimit, setQuestionLimit] = useState(false);
  const [timeLimit, setTimeLimit] = useState(false);

  const form = useForm({
    initialValues: {
      ruleType: 'FREE',
      questionLimit: 50,
      timeLimit: '00:00:00',
    },
    validate: {
    },
    validateInputOnBlur: true,
  });

  return (
    <Modal opened={opened} onClose={onClose} title="ルール作成">
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Select
          mb="sm"
          label="ルールの形式"
          itemComponent={SelectItem}
          dropdownPosition="bottom"
          searchable
          nothingFound="No options"
          maxDropdownHeight={280}
          data={RuleTypesData}
          {...form.getInputProps('ruleType')}
        />
        <Switch
          label="限定問題数を使用する"
          checked={questionLimit}
          onChange={(event) => setQuestionLimit(event.currentTarget.checked)}
          pb="sm"
        />
        {questionLimit && (
          <NumberInput
            pb="sm"
            min={0}
            step={5}
            {...form.getInputProps('questionLimit')}
          />
        )}
        <Switch
          label="制限時間を使用する"
          checked={timeLimit}
          onChange={(event) => setTimeLimit(event.currentTarget.checked)}
          pb="sm"
        />
        {timeLimit && (
          <TimeInput
            withSeconds
            pb="sm"
            {...form.getInputProps('timeLimit')}
          />
        )}
        <Group position="right">
          <Button type="submit">
            開始
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default CreateRoundModal;
