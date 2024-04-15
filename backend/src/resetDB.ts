import db from "./db";
import { Continent } from "./entities/continent";
import { Country } from "./entities/country";

async function clearDB() {
  const runner = db.createQueryRunner();
  await runner.query("PRAGMA foreign_keys=OFF");
  await Promise.all(
    db.entityMetadatas.map(async (entity) =>
      runner.query(`DROP TABLE IF EXISTS ${entity.tableName}`)
    )
  );
  await runner.query("PRAGMA foreign_keys=ON");
  await db.synchronize();
}

export default async function main() {
  await db.initialize();
  await clearDB();

  const france = Country.create({
    code: "FR",
    name: "France",
    emoji: "🇫🇷",
  });
  const allemagne = Country.create({
    code: "D",
    name: "Allemagne",
    emoji: "🇩🇪",
  });
  const belgique = Country.create({
    code: "BE",
    name: "belgique",
    emoji: "🇧🇪",
  });

  const continent1 = Continent.create({ continent: "continent1" });
  const continent2 = Continent.create({ continent: "continent2" });

  france.continent = continent1;
  allemagne.continent = continent2;
  belgique.continent = continent1;

  await france.save();
  await allemagne.save();
  await belgique.save();

  console.log("done !");
}

main();
