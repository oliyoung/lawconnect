"use client";

import useGetPrompts from "@/lib/hooks/useGetPrompts";
import { Prompt } from "@/types";
import { Box, Card, Flex, Spinner, Text } from "@radix-ui/themes";
import { Suspense } from "react";

interface PromptsParams {
    onSelect: (id: Prompt['id']) => void;
}

export default function Prompts({ onSelect }: PromptsParams) {
    const { prompts, isLoading } = useGetPrompts()
    if (isLoading) {
        return <Spinner />
    }
    return <Suspense fallback={<Spinner />}>
        <Box p='4'>
            <Flex direction={"column"} gap="4">
                {prompts?.map(prompt =>
                    <Box key={prompt.id} onClick={() => onSelect(prompt.id)}>
                        <Text className="text-sm block">{prompt.body.slice(0, 100)}...</Text>
                        <Text className="text-xs text-slate-500">{new Date(prompt.createdAt).toLocaleTimeString()}</Text>
                    </Box>
                )}
            </Flex>
        </Box>
    </Suspense>
}