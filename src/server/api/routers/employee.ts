import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const employeeRouter = createTRPCRouter({
  details: publicProcedure
    .input(z.object({ name: z.string(), companyId: z.string() }))
    .query(({ input }) => {}),
  getCompanies: publicProcedure.query(({ ctx }) => {
    const companies = ctx.prisma.company.findMany();
    return companies;
  }),
});
