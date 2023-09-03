/*
  Warnings:

  - You are about to drop the `FollowerRelationship` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FollowingRelationship` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FollowerRelationship" DROP CONSTRAINT "FollowerRelationship_followingId_fkey";

-- DropForeignKey
ALTER TABLE "FollowingRelationship" DROP CONSTRAINT "FollowingRelationship_followerId_fkey";

-- DropTable
DROP TABLE "FollowerRelationship";

-- DropTable
DROP TABLE "FollowingRelationship";

-- CreateTable
CREATE TABLE "Followers" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "followerId" TEXT NOT NULL,

    CONSTRAINT "Followers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Following" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,

    CONSTRAINT "Following_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Followers_userId_followerId_key" ON "Followers"("userId", "followerId");

-- CreateIndex
CREATE UNIQUE INDEX "Following_userId_followingId_key" ON "Following"("userId", "followingId");

-- AddForeignKey
ALTER TABLE "Followers" ADD CONSTRAINT "Followers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Followers" ADD CONSTRAINT "Followers_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Following" ADD CONSTRAINT "Following_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Following" ADD CONSTRAINT "Following_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
