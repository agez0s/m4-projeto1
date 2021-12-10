-- CreateTable
CREATE TABLE "_FilmesToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FilmesToUser_AB_unique" ON "_FilmesToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_FilmesToUser_B_index" ON "_FilmesToUser"("B");

-- AddForeignKey
ALTER TABLE "_FilmesToUser" ADD FOREIGN KEY ("A") REFERENCES "Filmes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FilmesToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
