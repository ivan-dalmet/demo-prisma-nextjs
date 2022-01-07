import { Idea } from '@prisma/client';
import axios, { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export const useIdeas = () => {
  return useQuery<Idea[]>(['ideas'], async () => {
    const { data } = await axios.get('/api/ideas');
    return data?.data;
  });
};

export const useCreateIdea = () => {
  const queryClient = useQueryClient();
  return useMutation<Idea, AxiosError, Pick<Idea, 'title' | 'description'>>(
    async (payload) => {
      const { data } = await axios.post('/api/ideas', payload);
      return data?.data;
    },

    {
      onMutate: (payload) => {
        queryClient.cancelQueries(['ideas']);
        queryClient.setQueryData(['ideas'], (ideas: Idea[]) => [
          {
            id: Math.random(),
            createdAt: dayjs().format(),
            voteCount: 0,
            ...payload,
          },
          ...ideas,
        ]);
      },
      onSettled: () => {
        queryClient.invalidateQueries(['ideas']);
      },
    }
  );
};

export const useVoteIdea = () => {
  const queryClient = useQueryClient();
  return useMutation<Idea, AxiosError, string>(
    async (id) => {
      const { data } = await axios.patch(`/api/ideas/${id}`);
      return data?.data;
    },
    {
      onMutate: (id) => {
        queryClient.cancelQueries(['ideas']);
        queryClient.setQueryData(['ideas'], (ideas: Idea[]) =>
          ideas.map((idea) =>
            idea.id === id ? { ...idea, voteCount: idea.voteCount + 1 } : idea
          )
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries(['ideas']);
      },
    }
  );
};
