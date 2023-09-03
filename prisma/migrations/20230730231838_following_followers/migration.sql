/*
  Warnings:

  - You are about to drop the `_FollowRelation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_FollowRelation" DROP CONSTRAINT "_FollowRelation_A_fkey";

-- DropForeignKey
ALTER TABLE "_FollowRelation" DROP CONSTRAINT "_FollowRelation_B_fkey";

-- DropTable
DROP TABLE "_FollowRelation";

-- CreateTable
CREATE TABLE "FollowingRelationship" (
    "id" TEXT NOT NULL,
    "followerId" TEXT NOT NULL,

    CONSTRAINT "FollowingRelationship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FollowerRelationship" (
    "id" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,

    CONSTRAINT "FollowerRelationship_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FollowingRelationship" ADD CONSTRAINT "FollowingRelationship_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FollowerRelationship" ADD CONSTRAINT "FollowerRelationship_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
