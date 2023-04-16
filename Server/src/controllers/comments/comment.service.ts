import { AppDataSource } from '../../data-source';
import { Comments } from '../../entities/comments';
import { SucessResponce, ErrorResponce } from '../../@types/responceTypes';
import { CommentType, CommentValidator } from '../../utils/validation';

const CommentsSource = AppDataSource.getRepository(Comments);

export const getComments = async (videoId: string) => {
  try {
    const data = await CommentsSource.find({
      where: {
        videoId,
      },
    });
    return {
      message: 'Request Sucessfull',
      data,
    } as SucessResponce;
  } catch (err) {
    console.log(err);
    throw {
      message: 'Some Error Occured',
      data: [],
    } as ErrorResponce;
  }
};

export const addComment = async (
  userId: string,
  videoId: string,
  comment: string
) => {
  try {
    const parsedData: CommentType = await CommentValidator.parseAsync({
      userId,
      videoId,
      comment,
    });
    const newComment = new Comments();
    newComment.comment = parsedData.comment;
    newComment.userId = parsedData.userId;
    newComment.videoId = parsedData.videoId;
    const data = await CommentsSource.save(newComment);
    return {
      message: 'Comment added successfully',
      data: data,
    } as SucessResponce;
  } catch (err) {
    console.log(err);
    throw {
      message: 'Some Error Occurred',
      data: [],
      error: err,
    } as ErrorResponce;
  }
};

export const deleteComment = async (userId: string, commentId: string) => {
  try {
    const commentToRemove = await CommentsSource.findOne({
      where: { _id: commentId, userId: userId },
    });
    if (!commentToRemove) throw { message: 'Invalid user or comment.' };
    const data = await CommentsSource.remove(commentToRemove);

    return {
      message: 'Deleted comment successfully',
      data: data,
    } as SucessResponce;
  } catch (err) {
    console.log(err);
    throw {
      message: 'Some Error Occurred',
      data: [],
      error: err,
    } as ErrorResponce;
  }
};
