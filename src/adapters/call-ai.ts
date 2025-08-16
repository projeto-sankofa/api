import { aiResultClassificationEnum } from "@/db/schema"

interface CallAIResponse {
    classification: typeof aiResultClassificationEnum.enumValues[number]
    confidence: number
}

export async function callAI(text: string): Promise<CallAIResponse> {
    return {
        classification: 'racist',
        confidence: 0.89
    }
}