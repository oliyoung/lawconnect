"use client";

import { NewPrompt, PromptResponses, Prompts } from "@/components";
import { Prompt } from "@/types";
import { Box, Button, Grid } from "@radix-ui/themes";
import { useState } from "react";

export default function Home() {
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt['id']>()
  const [createMode, setCreateMode] = useState<boolean>(false);

  return (
    <Grid gap="4" rows="1" columns="180px 1fr">
      <Box id="prompts" className="box">
        <Button className="w-full" onClick={() => setCreateMode(true)}>Create</Button>
        <Prompts onSelect={(id: Prompt['id']) => { setCreateMode(false); setSelectedPrompt(id) }} />
      </Box>
      <Box id="conversation" className="box">
        {createMode && <NewPrompt onSuccess={(id: Prompt['id']) => { setCreateMode(false); setSelectedPrompt(id) }} />}
        {selectedPrompt && !createMode && <PromptResponses id={selectedPrompt} />}
      </Box>
    </Grid>
  );
}
