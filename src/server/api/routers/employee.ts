import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const employeeRouter = createTRPCRouter({
  details: publicProcedure
    .input(
      z.object({
        name: z.string(),
        companyId: z.string(),
        walletAddress: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const company = await ctx.prisma.company.findUnique({
        where: { id: input.companyId },
      });
      if (!company) {
        throw new Error("Company not found");
      }

      const employee = await ctx.prisma.employee.create({
        data: {
          name: input.name,
          company: {
            connect: {
              id: input.companyId,
            },
          },
          walletAddress: input.walletAddress,
        },
      });

      return employee;
    }),
  getCompanies: publicProcedure.query(({ ctx }) => {
    const companies = ctx.prisma.company.findMany();
    return companies;
  }),
  getEmployee: publicProcedure
    .input(
      z.object({
        walletAddress: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const employee = await ctx.prisma.employee.findUnique({
        where: { walletAddress: input.walletAddress },
      });
      return employee;
    }),

  getUserComplaints: publicProcedure
    .input(
      z.object({
        walletAddress: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const complaints = await ctx.prisma.complaint.findMany({
        where: { id: input.walletAddress },
      });
      return complaints;
    }),
});
