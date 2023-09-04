import { fetcher } from "~/lib/constants/fetch";
export type Broadcasts = {
  creation_time: number;
  duration: number;
  empty_timeout: number;
  Metadata: {
    description: string;
    video_source: string;
  };
  name: string;
  sid: string;
};
export type CreateBroadcastsInput = {
  room_name: string;
  owner: string;
  description?: string;
  video_source?: string;
};
type GetBroadcastsResponse = { [key: string]: Broadcasts };
export const createBroadcasts = (data: CreateBroadcastsInput) => {
  const formData = new FormData();

  formData.append("room_name", data.room_name);
  formData.append("owner", data.owner);
  formData.append("description", data.description || "");
  formData.append("video_source", data.video_source || "");

  return fetcher("/broadcasts", {
    method: "POST",
    body: formData,
  })
    .then((res) => res as Broadcasts)
    .catch((error) => {
      throw error;
    });
};

export const getBroadcasts = async () => {
  try {
    const data = await fetcher<GetBroadcastsResponse>("/broadcasts");
    const result: Broadcasts[] = Object.values(data);

    return result;
  } catch (error) {
    throw error;
  }
};
