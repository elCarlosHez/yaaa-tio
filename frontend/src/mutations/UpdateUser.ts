import { useMutation } from "react-query";
import { pb, queryClient } from "../lib";
import { GET_USERS_KEY } from "../queries";

export interface ProfileForm {
  userId: string;
  username: string;
  avatar?: FileList;
}

export const useUpdateUser = () =>
  useMutation(
    async (data: ProfileForm) => {
      const body = new FormData();
      body.set("username", data.username);
      if (data.avatar?.length) {
        const blob = new Blob([data.avatar[0]], { type: "image/jpeg" });
        body.set("avatar", blob);
      }
      return await pb.collection("users").update(data.userId, body);
    },
    {
      onSuccess: (_) => {
        queryClient.invalidateQueries({
          queryKey: [GET_USERS_KEY],
        });
      },
    }
  );
