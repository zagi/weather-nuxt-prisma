import prisma from "./prisma";
// import { Prisma } from "@prisma/client";
// Prisma.LogCreateInput
export async function createLog(
  request: string,
  response: string,
  status: number,
  desc: string
) {
  const logs: Array<Log> = await prisma.log.create({
    data: {
      request: request,
      response: response,
      status: status,
      desc: desc,
    },
  });
  return logs;
}

export async function getLogs() {
  return await prisma.log.findMany({
    orderBy: {
      id: "desc",
    },
  });
}
