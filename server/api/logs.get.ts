import { getLogs } from '../utils/logService';
export default defineEventHandler(async (event) => {
    return await getLogs();
});