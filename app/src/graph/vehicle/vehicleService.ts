import {apolloClient} from '../apolloClient';
import {GetVehicleQuery, GetVehicleQueryVariables, VehicleDetailFragment} from '../generated';
import {getVehicle} from './vehicle.graphql';

export namespace VehicleService {

    export type VehicleDetail = VehicleDetailFragment;

    export const getVehicleById = (id: string): Promise<VehicleDetail> =>
        apolloClient.query<GetVehicleQuery, GetVehicleQueryVariables>({
            query: getVehicle,
            variables: {
                id
            }
        }).then(({data}) => data.getVehicle);

}
