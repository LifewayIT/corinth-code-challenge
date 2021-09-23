export const toResourceUrl = <T extends { __typename?: string; id: string }>(value: T): string => {
    switch (value.__typename) {
        case 'Character':
            return `/character/${value.id}`;
        case 'Film':
            return `/film/${value.id}`;
        case 'Planet':
            return `/planet/${value.id}`;
        case 'Species':
            return `/species/${value.id}`;
        case 'Starship':
            return `/starship/${value.id}`;
        case 'Vehicle':
            return `/vehicle/${value.id}`;
        default:
            return null;
    }
};
