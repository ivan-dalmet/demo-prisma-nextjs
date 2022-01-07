import React from 'react';

import { Avatar, Box, Button, HStack, Stack } from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { signIn, signOut, useSession } from 'next-auth/react';

import { FieldInput, FieldTextarea } from '@/components';
import { useCreateIdea, useIdeas, useVoteIdea } from '@/ideas/ideas.service';

const Index = () => {
  const { data: session } = useSession();
  const form = useForm();
  const { data: ideas } = useIdeas();
  const { mutate: createIdea, isLoading: isCreating } = useCreateIdea();
  const { mutate: voteIdea } = useVoteIdea();
  const handleSubmit = (values) => {
    createIdea(values);
    form.reset();
  };
  return (
    <Stack direction="row" p="8" spacing="8">
      <Formiz
        id="create-idea"
        autoForm
        connect={form}
        onValidSubmit={handleSubmit}
      >
        <Stack spacing="4">
          {!session ? (
            <Button onClick={() => signIn('twitch')}>Sign In</Button>
          ) : (
            <HStack>
              <Avatar src={session.user.image} />
              <Button onClick={() => signOut()}>Sign Out</Button>
            </HStack>
          )}
          <FieldInput
            name="title"
            label="Title"
            required="An idea without a title??"
          />
          <FieldTextarea name="description" label="Description" />
          <Button type="submit" variant="@primary" isLoading={isCreating}>
            Share Idea
          </Button>
        </Stack>
      </Formiz>
      <Stack>
        {ideas?.map((idea) => (
          <HStack key={idea.id}>
            <Box>
              {idea.title} - ({idea.voteCount})
            </Box>
            {!!session && <Button onClick={() => voteIdea(idea.id)}>+1</Button>}
          </HStack>
        ))}
      </Stack>
    </Stack>
  );
};
export default Index;
