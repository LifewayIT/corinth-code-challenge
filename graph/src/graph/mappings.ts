import {Character, Film, Gender, Planet, Species, Starship, Vehicle} from './generated';

export const getIdFromUrl = (url: SWAPI.Url): string =>
    url.substr(0, url.length - 1).split('/').pop();

export const toFloat = (str: string): number => {
    const result = parseFloat(str);
    return !isNaN(result) ? result : null;
};

export const toInt = (str: string): number => {
    const result = parseInt(str, 10);
    return !isNaN(result) ? result : null;
};

export const toList = (str: string, delimiter = ','): string[] => {
    if (str) {
        return str.split(delimiter).map((val) => val.trim());
    } else {
        return [];
    }
};

export const toGender = (str: string): Gender => {
    switch (str) {
        case 'male':
            return Gender.Male;
        case 'female':
            return Gender.Female;
        default:
            return null;
    }
};

export const toPictureAsset = (id: string, asset: 'characters' | 'films' | 'planets' | 'species' | 'starships' | 'vehicles'): string =>
    `https://starwars-visualguide.com/assets/img/${asset}/${id}.jpg`;

export const toCharacter = (character: SWAPI.Person): Character => {
    const id = getIdFromUrl(character.url);
    return {
        __typename: 'Character',
        id,
        picture: toPictureAsset(id, 'characters'),
        birthYear: character.birth_year,
        eyeColor: character.eye_color,
        gender: toGender(character.gender),
        height: toInt(character.height),
        hairColor: character.hair_color,
        mass: toInt(character.mass),
        skinColor: character.skin_color,
        name: character.name,
        created: character.created,
        modified: character.edited
    };
};

export const toPlanet = (planet: SWAPI.Planet): Planet => {
    const id = getIdFromUrl(planet.url);
    return {
        __typename: 'Planet',
        id,
        name: planet.name,
        picture: toPictureAsset(id, 'planets'),
        rotationPeriodInHours: toInt(planet.rotation_period),
        orbitalPeriod: toInt(planet.orbital_period),
        diameter: toInt(planet.diameter),
        climate: planet.climate,
        gravity: planet.gravity,
        terrain: toList(planet.terrain),
        surfaceWater: toInt(planet.surface_water),
        population: planet.population,
        created: planet.created,
        modified: planet.edited
    };
};

export const toFilm = (film: SWAPI.Film): Film => {
    const id = getIdFromUrl(film.url);
    return {
        __typename: 'Film',
        id,
        name: film.title,
        picture: toPictureAsset(id, 'films'),
        releaseDate: film.release_date,
        director: film.director,
        episodeId: film.episode_id,
        openingCrawl: film.opening_crawl,
        producer: film.producer,
        created: film.created,
        edited: film.edited
    };
};

export const toStarship = (starship: SWAPI.Starship): Starship => {
    const id = getIdFromUrl(starship.url);
    return {
        __typename: 'Starship',
        id,
        name: starship.name,
        picture: toPictureAsset(id, 'starships'),
        model: starship.model,
        manufacturer: starship.manufacturer,
        costInCredits: starship.cost_in_credits,
        length: toInt(starship.length),
        maxAtmospheringSpeed: starship.max_atmosphering_speed,
        crew: toInt(starship.crew),
        passengers: toInt(starship.crew),
        cargoCapacity: starship.cargo_capacity,
        consumables: starship.consumables,
        hyperdriveRating: toFloat(starship.hyperdrive_rating),
        MGLT: starship.MGLT,
        starshipClass: starship.starship_class,
        created: starship.created,
        edited: starship.edited
    };
};

export const toSpecies = (species: SWAPI.Species): Species => {
    const id = getIdFromUrl(species.url);
    return {
        __typename: 'Species',
        id,
        name: species.name,
        picture: toPictureAsset(id, 'species'),
        averageHeight: toFloat(species.average_height),
        averageLifespan: toInt(species.average_lifespan),
        classification: species.classification,
        designation: species.designation,
        eyeColors: toList(species.eye_colors),
        hairColors: toList(species.hair_colors),
        language: species.language,
        skinColors: toList(species.skin_colors),
        created: species.created,
        edited: species.edited
    };
};

export const toVehicle = (vehicle: SWAPI.Vehicle): Vehicle => {
    const id = getIdFromUrl(vehicle.url);
    return {
        __typename: 'Vehicle',
        id,
        name: vehicle.name,
        picture: toPictureAsset(id, 'vehicles'),
        cargoCapacity: vehicle.cargo_capacity,
        consumables: vehicle.consumables,
        costInCredits: vehicle.cost_in_credits,
        crew: toInt(vehicle.crew),
        length: toInt(vehicle.length),
        manufacturer: vehicle.manufacturer,
        maxAtmospheringSpeed: toInt(vehicle.max_atmosphering_speed),
        model: vehicle.model,
        passengers: toInt(vehicle.passengers),
        vehicleClass: vehicle.vehicle_class,
        created: vehicle.created,
        edited: vehicle.edited
    };
};
