import { deleteCity } from "../utils/cityService";
import { createLog } from "../utils/logService";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    await deleteCity(body.id);
    createLog(
      `/api/city`,
      JSON.stringify(body),
      200,
      `Object with city.id=${body.id} and it's saved weather was deleted successfully.`
    );
    return {
      status: "success",
    };
  } catch (error) {
    createLog(
      `/api/city`,
      "",
      500,
      `Something went wrong with city.id=${body.id} deletion.`
    );
    return createError({
      statusCode: 500,
    });
  }
});
