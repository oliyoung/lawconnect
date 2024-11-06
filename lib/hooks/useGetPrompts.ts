import { Prompt } from "@/types"
import useSWR from "swr"
import { fetcher } from "@/lib/fetcher"

export default function useGetPrompts() {
    const { data, error, isLoading } = useSWR(`/api/prompts`, fetcher)

    return {
        prompts: data as Prompt[],
        isLoading,
        isError: error
    }
}
