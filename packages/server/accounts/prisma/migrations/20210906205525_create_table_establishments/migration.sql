-- CreateTable
CREATE TABLE "establishments" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "restaurateur_id" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "establishments.phone_unique" ON "establishments"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "establishments.restaurateur_id_unique" ON "establishments"("restaurateur_id");

-- AddForeignKey
ALTER TABLE "establishments" ADD FOREIGN KEY ("restaurateur_id") REFERENCES "restaurateurs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
