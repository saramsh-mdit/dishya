import { SucessResponce, ErrorResponce } from '../../@types/responceTypes';
import { AppDataSource } from '../../data-source';
import { Tags } from '../../entities/tags';

const TagsSource = AppDataSource.getRepository(Tags);


export const getTags = async () => {
    try {
      const data = await TagsSource.find();
      return {
        message: 'Request Successful',
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

  export const postTag = async (name:string) => {
    try {
        const newTag = new Tags();
        newTag.name = name;
      const data = await TagsSource.save(newTag);
      return {
        message: 'Request Successful',
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