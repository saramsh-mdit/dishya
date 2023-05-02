import { AppDataSource } from "../../data-source";
import { Comments } from "../../entities/comments";
import { SucessResponce, ErrorResponce } from "../../@types/responceTypes";
import { CommentType, CommentValidator } from "../../utils/validation";
import { Users } from "../../entities/users";

const CommentsSource = AppDataSource.getRepository(Comments);
const UsersSource = AppDataSource.getRepository(Users);

export const getComments = async (videoId: string) => {
  try {
    const data = await CommentsSource.find({
      select: {
        _id: true,
        videoId: true,
        comment: true,
        dateCreated: true,
        dateModified: true,
        user: {
          _id: true,
          userName: true,
        },
      },
      where: {
        videoId,
      },
      relations: {
        user: true,
      },
    });
    return {
      message: "Request Sucessfull",
      data: data?.reverse(),
    } as SucessResponce;
  } catch (err) {
    console.log(err);
    throw {
      message: "Some Error Occured",
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
    const user = await UsersSource.findOne({
      where: {
        _id: userId,
      },
    });
    console.log("User in comment", user);
    newComment.comment = parsedData.comment;
    newComment.user = user;
    newComment.videoId = parsedData.videoId;
    const data = await CommentsSource.save(newComment);
    return {
      message: "Comment added successfully",
      data: data,
    } as SucessResponce;
  } catch (err) {
    console.log(err);
    throw {
      message: "Some Error Occurred",
      data: [],
      error: err,
    } as ErrorResponce;
  }
};

export const deleteComment = async (userId: string, commentId: string) => {
  try {
    const user = await UsersSource.findOne({
      where: {
        _id: userId,
      },
    });
    const commentToRemove = await CommentsSource.findOne({
      where: { _id: commentId },
      relations: {
        user: true,
      },
    });
    if (commentToRemove.user._id !== user._id)
      throw { message: "Invalid user or comment." };
    const data = await CommentsSource.remove(commentToRemove);

    return {
      message: "Deleted comment successfully",
      data: data,
    } as SucessResponce;
  } catch (err) {
    console.log(err);
    throw {
      message: "Some Error Occurred",
      data: [],
      error: err,
    } as ErrorResponce;
  }
};
