import { deleteCity } from "../utils/cityService";
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    await deleteCity(body.id);
    return {
      status: "success",
    };
  } catch (error) {
    return createError({
      statusCode: 500,
    });
  }
});
