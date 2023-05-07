import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import RelayPlugin from '@pothos/plugin-relay';
import { UserData } from '@prisma/client';

import { prisma } from '../lib/prisma';

import type PrismaTypes from '@pothos/plugin-prisma/generated';

export const pothosBuilder = new SchemaBuilder<{
  Scalars: {
    DateTime: {
      Input: Date;
      Output: Date;
    };
  };
  PrismaTypes: PrismaTypes;
  Context: {
    currentUserData: UserData | null;
  }
}>({
  plugins: [PrismaPlugin, RelayPlugin],
  prisma: {
    client: prisma,
    exposeDescriptions: true,
    filterConnectionTotalCount: true,
  },
  relayOptions: {
    clientMutationId: 'omit',
    cursorType: 'String',
  },
});
