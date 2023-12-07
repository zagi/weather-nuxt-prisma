import prisma from "./prisma";

export async function getCities() {
  const cities: Array<City> = await prisma.city.findMany({
    include: {
      weathers: {
        orderBy: {
          id: 'desc',
        }
      },
    },
  });
  return cities;
}

export async function getCity(id: string) {
  const city: City | null = await prisma.city.findUnique({
    where: {
      id: id,
    },
  })
  return city
}

export async function createCity(
  name: string,
  country: string,
  lat: number,
  lon: number,
  temperature: number,
  unit: string
) {
  const city: City = await prisma.city.create({
    data: {
      name: name,
      country: country,
      lat: lat,
      lon: lon,
      weathers: {
        create: {
          temperature: temperature,
          unit: unit,
        },
      },
    },
    include: {
      weathers: true
    }
  });
  return city;
}

export async function createWeather(
  cityId: string,
  temperature: number,
  unit: string
) {
  const city: City = await prisma.city.update({
    where: {
      id: cityId,
    },
    data: {
      weathers: {
        create: {
          temperature: temperature,
          unit: unit,
        },
      },
    },
  });
  return city;
}
