import * as z from "zod";

export const issuerKycSchema = z.object({
  name: z.string().min(1).max(20),
  valuation: z.enum([
    "",
    "0-1M",
    "1-10M",
    "10-50M",
    "50-100M",
    "100-500M",
    "500-1000M",
    "1000M+",
  ]),
  employeeCount: z.enum([
    "",
    "1-10",
    "11-50",
    "51-200",
    "201-500",
    "501-1000",
    "1001-5000",
    "5001-10000",
    "10001+",
  ]),
  revenue: z.enum([
    "",
    "0-1M",
    "1-10M",
    "10-50M",
    "50-100M",
    "100-500M",
    "500-1000M",
    "1000M+",
  ]),
  age: z.number().min(1).max(1000),
  govermentalInfluence: z.string(),
});

export const issueBondSchema = z.object({
  bondSeries: z.string().min(1).max(20),
  parValue: z.string().min(1).max(1000000000),
  couponRate: z.string().min(1).max(1000000000),
  tenor: z.string().min(1).max(100),
  bondSupply: z.string().min(1).max(10000),
  couponPaymentSchedule: z.enum([
    "",
    "monthly",
    "quarterly",
    "semi-annually",
    "annually",
  ]),
});
