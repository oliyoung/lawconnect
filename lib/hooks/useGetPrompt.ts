import { Prompt } from "@/types"
import useSWR from "swr"
import { fetcher } from "@/lib/fetcher"

interface UseGetPromptData extends Prompt {
    responses: string[]
}

export default function useGetPrompt(id: Prompt['id']) {
    const { data, error, isLoading } = useSWR(`/api/prompts/${id}`, fetcher)

    return {
        data: data as UseGetPromptData,
        isLoading,
        isError: error
    }
}
