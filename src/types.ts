import {
  FastifyBaseLogger,
  FastifyInstance,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export type FastifyTypedInstance = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  FastifyBaseLogger,
  ZodTypeProvider
>;

export type Comment = {
  content: string
  source: string
}

export enum AIResultClassificationEnum {
  RACIST = "racist",
  NON_RACIST = "non_racist"
}

export type AIResult = {
  text: string
  classification: AIResultClassificationEnum
  confidence: number
  source: string
  collectedAt: Date
}

export interface AIResultWithId extends AIResult {
  id: string
}