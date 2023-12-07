import { getCities } from '../utils/cityService';
export default defineEventHandler(async (event) => {
    return await getCities();
});