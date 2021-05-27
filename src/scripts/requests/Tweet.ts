import axios from 'axios';

export type Tweet = {
  id: number,
  user_id: number,
  user_name: string,
  user_account_name: string,
  content: string,
  created_at: Date,
  updated_at: Date,
}

export const tweetRequest = () => {
  const ipAddress = '192.168.10.8';
  const baseUrl = `http://${ipAddress}:3000/tweets`;
  const index = () => axios.get<Tweet[]>(baseUrl);
  const show = (id: number) => axios.get<Tweet>(`${baseUrl}/${id}`);
  const create = (params: any) => axios.post<Tweet>(baseUrl, params);
  const update = (params: any) => axios.put<Tweet>(`${baseUrl}/${params.id}`, params);
  const destroy = (id: number) => axios.delete<Tweet>(`${baseUrl}/${id}`);
  return {
    index,
    show,
    create,
    update,
    destroy,
  };
};

// https://qiita.com/NeGI1009/items/a98c6a76b0c4f3bc18b3
