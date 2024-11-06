"use client";

import PromptResponses from "@/components/PromptResponses";
import Prompts from "@/components/Prompts";
import { Prompt } from "@/types";
import { Box, Grid } from "@radix-ui/themes";
import { useState } from "react";

export default function Home() {
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt['id']>()

  return (
    <Grid gap="4" rows="1" columns="180px 1fr">
      <Box id="prompts" className="box">
        <Prompts onSelect={(id: Prompt['id']) => setSelectedPrompt(id)} />
      </Box>
      <Box id="conversation" className="box">
        {selectedPrompt && <PromptResponses id={selectedPrompt} />}
      </Box>
    </Grid>
  );
}
