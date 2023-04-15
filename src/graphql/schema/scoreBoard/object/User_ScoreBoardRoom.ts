import { objectType } from 'nexus';
import { User_ScoreBoardRoom } from 'nexus-prisma';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const User_ScoreBoardRoomObject = objectType({
  name: User_ScoreBoardRoom.$name,
  description: User_ScoreBoardRoom.$description,
  definition(t) {
    //* メタデータ
    t.field(User_ScoreBoardRoom.userData);
    t.field(User_ScoreBoardRoom.scoreBoardRoomId);
    t.field(User_ScoreBoardRoom.userDataId);
    t.field(User_ScoreBoardRoom.scoreBoardRoom);

    //* 実データ
    t.field(User_ScoreBoardRoom.role);
  },
});
