import { z } from "zod";

export const CommentValidator = z.object({
  _id: z.string().uuid().optional(),
  userId: z.string().uuid(),
  comment: z.string(),
  videoId: z.string().uuid(),
});
export const LikeValidator = z.object({
  _id: z.string().uuid().optional(),
  userId: z.string().uuid(),
  videoId: z.string().uuid(),
});
export const UserValidator = z.object({
  _id: z.string().uuid().optional(),
  userName: z.string(),
  password: z.string(),
  email: z.string(),
  isAdmin: z.boolean().optional(),
});

export const ViewValidator = z.object({
  _id: z.string().uuid().optional(),
  views: z.number().positive(),
  videoId: z.string().uuid(),
});

export const VideoValidator = z.object({
  _id: z.string().uuid().optional(),
  userId: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  tags:z.string().nullable()
});

export type CommentType = z.infer<typeof CommentValidator>;



export type LikeType = z.infer<typeof LikeValidator>;
export type UserType = z.infer<typeof UserValidator>;
export type ViewType = z.infer<typeof ViewValidator>;
export type VideoType = z.infer<typeof VideoValidator>;
