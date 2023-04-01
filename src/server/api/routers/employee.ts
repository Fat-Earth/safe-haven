import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const employeeRouter = createTRPCRouter({
  details: publicProcedure.input(z.object({ id: z.string() })).query(({ input }) => {
    return {
      greeting: `Hello ${input.id}`,
    };
  }),
  getCompanies: publicProcedure.query(({ ctx }) => {
    const companies = ctx.prisma.company.findMany();
    return companies;
  }),
});
