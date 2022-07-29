-- CreateTable
CREATE TABLE "Artist" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "grammy" BOOLEAN DEFAULT false,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);
