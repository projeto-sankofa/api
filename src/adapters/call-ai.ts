import { AIResultClassificationEnum } from "@/types"
import axios from "axios"

interface CallAIResponse {
    label: AIResultClassificationEnum
    score: number
}

export async function callAI(text: string): Promise<CallAIResponse> {
    const response = await axios.post<CallAIResponse>("http://127.0.0.1:8000/classify", {text});
    const label = response.data.label
    const score = response.data.score
    return (
        {label, score}
    );
}