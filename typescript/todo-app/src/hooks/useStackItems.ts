import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import stackService, { StackItem } from '../todoService/stackService';

// Define query keys for better organization
const STACK_KEYS = {
  all: ['stackItems'] as const,
  byOwner: (owner: string) => [...STACK_KEYS.all, owner] as const,
};

export const useStackItems = (owner: string) => {
  return useQuery({
    queryKey: STACK_KEYS.byOwner(owner),
    queryFn: () => stackService.getStackItems(owner),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreateStackItem = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (newStackItem: Omit<StackItem, '_id' | 'createdAt' | 'updatedAt'>) => 
      stackService.createStackItem(newStackItem),
    onSuccess: (data, variables) => {
      // Invalidate the query to refetch the updated list
      queryClient.invalidateQueries({ queryKey: STACK_KEYS.byOwner(variables.owner) });
    },
  });
};

export const useUpdateStackItem = (owner: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, updates }: { 
      id: string, 
      updates: Partial<Pick<StackItem, 'title' | 'content'>> 
    }) => stackService.updateStackItem(id, updates),
    onSuccess: () => {
      // Invalidate the query to refetch the updated list
      queryClient.invalidateQueries({ queryKey: STACK_KEYS.byOwner(owner) });
    },
  });
};

export const useDeleteStackItem = (owner: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => stackService.deleteStackItem(id),
    onSuccess: () => {
      // Invalidate the query to refetch the updated list
      queryClient.invalidateQueries({ queryKey: STACK_KEYS.byOwner(owner) });
    },
  });
}; 