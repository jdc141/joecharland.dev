import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    tech: z.array(z.string()).optional(),
    github: z.union([z.string(), z.tuple([z.boolean(), z.string()])]).optional(),
    demo: z.union([z.string(), z.tuple([z.boolean(), z.string()])]).optional(),
    order: z.number().optional(),
    inProgress: z.boolean().optional(),
    deployed: z.boolean().optional(),
  }),
});

export const collections = {
  projects,
};

