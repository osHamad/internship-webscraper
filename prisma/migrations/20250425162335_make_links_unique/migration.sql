/*
  Warnings:

  - A unique constraint covering the columns `[jobBoard]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[link]` on the table `Listing` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Company_jobBoard_key" ON "Company"("jobBoard");

-- CreateIndex
CREATE UNIQUE INDEX "Listing_link_key" ON "Listing"("link");
