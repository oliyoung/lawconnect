import { prompts, responses } from "@/db/schema"
import { InferSelectModel } from "drizzle-orm"

export type Prompt = InferSelectModel<typeof prompts>
export type Response = InferSelectModel<typeof responses>