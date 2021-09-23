import axios, {AxiosResponse} from 'axios';

export interface SWAPIClient {
    getFilm(id: string): Promise<AxiosResponse<SWAPI.Film>>;

    searchFilms(search?: string): Promise<AxiosResponse<SWAPI.ResultSet<SWAPI.Film>>>;

    getPage<T>(url: string): Promise<AxiosResponse<T>>;

    getPerson(id: string): Promise<AxiosResponse<SWAPI.Person>>;

    searchPeople(search?: string): Promise<AxiosResponse<SWAPI.ResultSet<SWAPI.Person>>>;

    getPlanet(id: string): Promise<AxiosResponse<SWAPI.Planet>>;

    searchPlanets(search?: string): Promise<AxiosResponse<SWAPI.ResultSet<SWAPI.Planet>>>;

    getSpecies(id: string): Promise<AxiosResponse<SWAPI.Species>>;

    searchSpecies(search?: string): Promise<AxiosResponse<SWAPI.ResultSet<SWAPI.Species>>>;

    getStarship(id: string): Promise<AxiosResponse<SWAPI.Starship>>;

    searchStarships(search?: string): Promise<AxiosResponse<SWAPI.ResultSet<SWAPI.Starship>>>;

    getVehicle(id: string): Promise<AxiosResponse<SWAPI.Vehicle>>;

    searchVehicles(search?: string): Promise<AxiosResponse<SWAPI.ResultSet<SWAPI.Vehicle>>>;
}

const API_ENDPOINT = 'https://swapi.dev/api';
type ResourceType = 'films' | 'people' | 'planets' | 'species' | 'starships' | 'vehicles';

const _fetchResourceById = <T>(resource: ResourceType, id: string): Promise<AxiosResponse<T>> =>
    axios.get(`${API_ENDPOINT}/${resource}/${id}`);

const _searchResource = <T>(resource: ResourceType, txt: string): Promise<AxiosResponse<SWAPI.ResultSet<T>>> =>
    axios.get(`${API_ENDPOINT}/${resource}?search=${txt}`);

export const swapiClient: SWAPIClient = {

    getFilm: (id: string) =>
        _fetchResourceById<SWAPI.Film>('films', id),

    getPage: <T>(url: string): Promise<AxiosResponse<T>> =>
        axios.get(url),

    getPerson: (id: string) =>
        _fetchResourceById<SWAPI.Person>('people', id),

    getPlanet: (id: string) =>
        _fetchResourceById<SWAPI.Planet>('planets', id),

    getStarship: (id: string) =>
        _fetchResourceById<SWAPI.Starship>('starships', id),

    getSpecies: (id: string) =>
        _fetchResourceById<SWAPI.Species>('species', id),

    getVehicle: (id: string) =>
        _fetchResourceById<SWAPI.Vehicle>('vehicles', id),

    searchFilms: (search?: string) =>
        _searchResource<SWAPI.Film>('films', search),

    searchPlanets: (search?: string) =>
        _searchResource<SWAPI.Planet>('planets', search),

    searchPeople: (search?: string) =>
        _searchResource<SWAPI.Person>('people', search),

    searchSpecies: (search?: string) =>
        _searchResource<SWAPI.Species>('species', search),

    searchStarships: (search?: string) =>
        _searchResource<SWAPI.Starship>('starships', search),

    searchVehicles: (search?: string) =>
        _searchResource<SWAPI.Vehicle>('vehicles', search),

};
