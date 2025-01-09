import { logger } from "@domain/utils/logger";
import { seedCategoriesArticle } from "@features/article/data/seed/seedCategoriesArticle";
import { seedStatusesArticle } from "@features/article/data/seed/seedStatusArticle";
import { seedTags } from "@features/article/data/seed/seedTags";
import { Configuration } from "@features/config/data/entity/configuration";
import { OpeningHour } from "@features/config/data/entity/openingHour";
import { Rate } from "@features/config/data/entity/rate";
import { seedCategories } from "@features/vehicle/data/seed/categorySeed";
import { seedStatuses } from "@features/vehicle/data/seed/statusSeed";
import { v4 as uuidv4 } from "uuid";

export async function seedData() {
  try {
    const [config] = await Configuration.findOrCreate({
      where: { name: "Douala Drive" },
      defaults: {
        id: uuidv4(),
        address: "Douala, Cameroun",
        phone: "+237 00 00 00 00",
        email: "contact@doualadrive.com",
      },
    });

    await OpeningHour.findOrCreate({
      where: {
        label: "Lundi - Samedi: 08:00 - 18:00",
        configuration_id: config.id,
      },
      defaults: {
        id: uuidv4(),
        configuration_id: config.id,
      },
    });

    await OpeningHour.findOrCreate({
      where: {
        label: "Dimanche: Sur rendez-vous",
        configuration_id: config.id,
      },
      defaults: {
        id: uuidv4(),
        configuration_id: config.id,
      },
    });

    const rates = [
      {
        id: uuidv4(),
        title: "Location en ville",
        icon: "lucide-react-icon-apartment",
        excerpt: "Pour vos déplacements urbains en toute élégance",
        price: "65 000 FCFA",
        description:
          "Chauffeur professionnel dédié, Kilométrage illimité en ville, Assurance tous risques incluse, Service personnalisé, Assistance 24/7",
        configuration_id: config.id,
      },
      {
        id: uuidv4(),
        title: "Location hors ville",
        icon: "lucide-react-icon-localisation",
        excerpt: "Explorez le Cameroun dans le plus grand confort",
        price: "80 000 FCFA",
        description:
          "Chauffeur professionnel expérimenté, Kilométrage illimité, Assurance tous risques incluse, GPS et assistance routière 24/7, Kit de secours et confort",
        configuration_id: config.id,
      },
      {
        id: uuidv4(),
        title: "Évènements",
        icon: "lucide-react-icon-date",
        excerpt: "Rendez vos occasions spéciales encore plus mémorables",
        price: "85 000 FCFA",
        description:
          "Chauffeur professionnel en tenue, Service VIP personnalisé, Décoration sur demande, Flexibilité horaire, Carburant inclus",
        configuration_id: config.id,
      },
      {
        id: uuidv4(),
        title: "Entreprises",
        icon: "lucide-react-icon-bag",
        excerpt: "Solutions personnalisées pour les professionnels",
        price: "Sur devis",
        description:
          "Contrats sur mesure, Facturation entreprise, Chauffeurs dédiés, Service prioritaire 24/7, Tarifs préférentiels",
        configuration_id: config.id,
      },
    ];

    for (const rate of rates) {
      await Rate.findOrCreate({
        where: { title: rate.title, configuration_id: rate.configuration_id },
        defaults: rate,
      });
    }

    await seedCategories();
    await seedStatuses();
    await seedCategoriesArticle();
    await seedStatusesArticle();
    await seedTags();

    logger.info("Données de base insérées avec succès.");
  } catch (error) {
    logger.error("Erreur lors de l'insertion des données de base :", error);
  }
}
