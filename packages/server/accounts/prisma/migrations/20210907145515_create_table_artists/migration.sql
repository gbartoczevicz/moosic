-- CreateTable
CREATE TABLE "artists" (
    "id" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "artists.document_unique" ON "artists"("document");

-- CreateIndex
CREATE UNIQUE INDEX "artists.user_id_unique" ON "artists"("user_id");

-- AddForeignKey
ALTER TABLE "artists" ADD FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
