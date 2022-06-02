import { initControllersDI } from '@controllers/init.di';
import { initRepositoriesDI } from '@repositories/init.di';
import { initServicesDI } from '@services/init.di';

export const initDI = () => {
    initControllersDI();
    initRepositoriesDI();
    initServicesDI();
}