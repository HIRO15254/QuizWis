import { objectType } from 'nexus';
import { Room } from 'nexus-prisma';

export const roomObject = objectType({
  name: Room.$name,
  description: Room.$description,
  definition(t) {
    t.implements('Node');
    t.field(Room.databaseId);
    t.field(Room.name);
    t.field(Room.isActive);
    t.field(Room.hashedPassword);
    t.field(Room.users);
    t.field(Room.createdAt);
    t.field(Room.updatedAt);
    t.nonNull.id('id', {
      resolve: (parent, _args, _ctx) => Buffer.from(`Room:${parent.databaseId}`).toString('base64'),
    });
    t.nonNull.field('hasPassword', {
      type: 'Boolean',
      resolve: (parent, _args, _ctx) => parent.hashedPassword !== null,
    });
  },
});
