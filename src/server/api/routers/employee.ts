import { ComplaintStatus, ComplaintType } from "@prisma/client";
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
          accountType: "EMPLOYEE",
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
        where: { authorId: input.walletAddress },
      });
      return complaints;
    }),

  getEmployeeList: publicProcedure
    .input(
      z.object({
        companyId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const employees = await ctx.prisma.employee.findMany({
        where: { companyId: input.companyId },
      });
      return employees;
    }),

  //     description
  // e_date
  // e_place
  // e_time
  // employeeId
  // type

  registerComplaint: publicProcedure
    .input(
      z.object({
        walletAddress: z.string(),
        companyId: z.string(),
        description: z.string(),
        e_date: z.string(),
        e_place: z.string(),
        e_time: z.string(),
        employeeId: z.string(),
        type: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const complaint = await ctx.prisma.complaint.create({
        data: {
          complaintType: input.type as ComplaintType,
          description: input.description,
          e_date: input.e_date,
          e_place: input.e_place,
          e_time: input.e_time,
          employee: {
            connect: {
              id: input.employeeId,
            },
          },
          authorId: input.walletAddress,
          company: {
            connect: {
              id: input.companyId,
            },
          },
          status: "PENDING",
        },
      });
      return complaint;
    }),
  getAllCompanyComplaints: publicProcedure
    .input(
      z.object({
        companyId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const complaints = await ctx.prisma.complaint.findMany({
        where: { companyId: input.companyId },
      });
      return complaints;
    }),

  updateComplaint: publicProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const complaint = await ctx.prisma.complaint.update({
        where: { id: input.id },
        data: {
          status: input.status as ComplaintStatus,
        },
      });
      return complaint;
    }),
  getAllEmployees: publicProcedure
    .input(
      z.object({
        companyId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const emp = await ctx.prisma.employee.findMany({
        where: {
          companyId: input.companyId,
        },
      });
      return emp;
    }),
});
