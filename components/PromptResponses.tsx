"use client";

import useGetPrompt from "@/lib/hooks/useGetPrompt";
import { Prompt } from "@/types";
import { Box, Flex, Spinner, Text } from "@radix-ui/themes";
import { Suspense } from "react";
import Markdown from 'react-markdown'

interface PromptResponses {
    id: Prompt['id']
}

export default function PromptResponses({ id }: PromptResponses) {
    const { data, isLoading, isError } = useGetPrompt(id)
    if (!id) {
        return <></>
    }
    if (isLoading) {
        return <Spinner />
    }
    return <Suspense fallback={<Spinner />}>
        <Box p="4">
            <Flex direction={"column"} gap="4">
                <Box className="bg-slate-100 rounded p-8">
                    <Text>{data.body}</Text>
                    <Text className="block text-xs text-slate-500">{new Date(data.createdAt).toLocaleTimeString()}</Text>
                </Box>
                {data.responses.map((body, index) => <Box key={index}>
                    <Text className='prompt-response'>
                        <Markdown>{body}</Markdown>
                    </Text>
                </Box>)}
            </Flex>
        </Box>
    </Suspense>
}