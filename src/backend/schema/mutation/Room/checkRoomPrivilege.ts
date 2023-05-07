import { RoomRole } from '@prisma/client';

export async function checkRoomPrivilege(input: {
  userDatabaseId: string,
  roomDatabaseId: string,
  requiredRole: RoomRole,
}): Promise<boolean> {
  const { userDatabaseId, roomDatabaseId, requiredRole } = input;
  if (await prisma.userData.findUnique({
    where: {
      databaseId: userDatabaseId,
    },
  }).then((userData) => userData?.isAdmin) === true) {
    return true;
  }
  const role = await prisma.user_Room.findFirstOrThrow({
    where: {
      userDataId: userDatabaseId,
      roomId: roomDatabaseId,
    },
  }).catch(() => {
    throw new Error('ルームのメンバーではないか、ルームが存在しません');
  }).then((userRoom) => userRoom.role);
  if (requiredRole === 'OWNER') {
    return role === 'OWNER';
  } if (requiredRole === 'MEMBER') {
    return role === 'OWNER' || role === 'MEMBER';
  }
  throw new Error('不正な権限が指定されました');
}
