-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "hashedPassword" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RoomToUserData" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RoomToUserData_AB_unique" ON "_RoomToUserData"("A", "B");

-- CreateIndex
CREATE INDEX "_RoomToUserData_B_index" ON "_RoomToUserData"("B");

-- AddForeignKey
ALTER TABLE "_RoomToUserData" ADD CONSTRAINT "_RoomToUserData_A_fkey" FOREIGN KEY ("A") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoomToUserData" ADD CONSTRAINT "_RoomToUserData_B_fkey" FOREIGN KEY ("B") REFERENCES "UserData"("id") ON DELETE CASCADE ON UPDATE CASCADE;
