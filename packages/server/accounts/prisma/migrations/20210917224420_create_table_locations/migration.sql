-- CreateTable
CREATE TABLE "locations" (
    "establishment_id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "num" INTEGER NOT NULL,
    "postalCode" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "locations.establishment_id_unique" ON "locations"("establishment_id");

-- CreateIndex
CREATE UNIQUE INDEX "locations.postalCode_unique" ON "locations"("postalCode");

-- CreateIndex
CREATE UNIQUE INDEX "locations_coordinates" ON "locations"("latitude", "longitude");

-- AddForeignKey
ALTER TABLE "locations" ADD FOREIGN KEY ("establishment_id") REFERENCES "establishments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
