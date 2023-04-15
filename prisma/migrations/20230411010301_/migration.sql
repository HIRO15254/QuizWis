-- DropForeignKey
ALTER TABLE "User_Round" DROP CONSTRAINT "User_Round_roundId_fkey";

-- DropForeignKey
ALTER TABLE "User_ScoreBoardRoom" DROP CONSTRAINT "User_ScoreBoardRoom_scoreBoardRoomId_fkey";

-- AddForeignKey
ALTER TABLE "User_ScoreBoardRoom" ADD CONSTRAINT "User_ScoreBoardRoom_scoreBoardRoomId_fkey" FOREIGN KEY ("scoreBoardRoomId") REFERENCES "ScoreBoardRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Round" ADD CONSTRAINT "User_Round_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round"("id") ON DELETE CASCADE ON UPDATE CASCADE;
