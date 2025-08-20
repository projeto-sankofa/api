import { AIResultClassificationEnum } from "@/types"

interface CallAIResponse {
    classification: AIResultClassificationEnum
    confidence: number
}

export async function callAI(text: string): Promise<CallAIResponse> {
    return {
        classification: AIResultClassificationEnum.RACIST,
        confidence: 0.89
    }
}