import db from "./db";
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
    nom: "France",
    emoji: "🇫🇷",
  });
  const allemagne = Country.create({
    code: "D",
    nom: "Allemagne",
    emoji: "🇩🇪",
  });
  const belgique = Country.create({
    code: "BE",
    nom: "belgique",
    emoji: "🇧🇪",
  });

  await france.save();
  await allemagne.save();
  await belgique.save();

  console.log("done !");
}

main();
