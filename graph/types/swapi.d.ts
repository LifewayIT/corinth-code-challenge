// ideally, this would be generated using the JSON schema, but as of writing, the schema endpoint for resources on swapi.dev is returning a 404 for schema endpoints
declare namespace SWAPI {

    type ResultSet<T> = {
        next: Url;
        previous: Url;
        count: number;
        results: T[];
    }

    type Url = string;

    type Film = {
        title: string;
        episode_id: number;
        opening_crawl: string;
        director: string;
        producer: string;
        release_date: string;
        characters: Url[];
        planets: Url[];
        starships: Url[];
        vehicles: Url[];
        species: Url[];
        created: string;
        edited: string;
        url: Url;
    };

    type Person = {
        birth_year: string;
        eye_color: string;
        films: Url[];
        gender: string;
        hair_color: string;
        height: string;
        homeworld: Url;
        mass: string;
        name: string;
        skin_color: string;
        created: string;
        edited: string;
        species: Url[];
        starships: Url[];
        url: Url;
        vehicles: Url[];
    };

    type Planet = {
        name: string;
        rotation_period: string;
        orbital_period: string;
        diameter: string;
        climate: string;
        gravity: string;
        terrain: string;
        surface_water: string;
        population: string;
        residents: Url[];
        films: Url[];
        created: string;
        edited: string;
        url: Url;
    };

    type Species = {
        average_height: string;
        average_lifespan: string;
        classification: string;
        created: string;
        designation: string;
        edited: string;
        eye_colors: string;
        hair_colors: string;
        homeworld: Url;
        language: string;
        name: string;
        people: Url[];
        films: Url[];
        skin_colors: string;
        url: string;
    };

    type Starship = {
        MGLT: string;
        cargo_capacity: string;
        consumables: string;
        cost_in_credits: string;
        created: string;
        crew: string;
        edited: string;
        hyperdrive_rating: string;
        length: string;
        manufacturer: string;
        max_atmosphering_speed: string;
        model: string;
        name: string;
        passengers: string;
        films: Url[],
        pilots: Url[],
        starship_class: string;
        url: Url;
    };

    type Vehicle = {
        cargo_capacity: string;
        consumables: string;
        cost_in_credits: string;
        created: string;
        crew: string;
        edited: string;
        length: string;
        manufacturer: string;
        max_atmosphering_speed: string;
        model: string;
        name: string;
        passengers: string;
        pilots: Url[];
        films: Url[];
        url: Url;
        vehicle_class: string;
    };

}
