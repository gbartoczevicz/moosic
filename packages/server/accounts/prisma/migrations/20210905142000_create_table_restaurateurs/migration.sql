-- CreateTable
CREATE TABLE "restaurateurs" (
    "id" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "restaurateurs.document_unique" ON "restaurateurs"("document");

-- CreateIndex
CREATE UNIQUE INDEX "restaurateurs.userId_unique" ON "restaurateurs"("userId");

-- AddForeignKey
ALTER TABLE "restaurateurs" ADD FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
