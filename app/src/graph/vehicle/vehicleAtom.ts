import {atom, selector} from 'recoil';
import {VehicleService} from './vehicleService';

export namespace VehicleAtom {

    export const vehicleId = atom<string>({
        key: 'vehicleId',
        default: null
    });

    export const vehicle = selector({
        key: 'vehicle',
        get: async ({get}) => {
            const id = get(vehicleId);
            if (id) {
                return VehicleService.getVehicleById(id);
            } else {
                return null;
            }
        }
    });

}
