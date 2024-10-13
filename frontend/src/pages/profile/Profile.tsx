import { Avatar, Box, Button, TextField } from "@mui/material";
import { pb } from "../../lib";
import EditIcon from "@mui/icons-material/Edit";
import { ProfileLayout, StyledBadge } from "./Profile.styles";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ProfileForm, useUpdateUser } from "../../mutations";

export const Profile = () => {
  const user = pb.authStore.model;
  const userImage = pb.getFileUrl(user!, user?.avatar!);
  const { mutateAsync: updateUser } = useUpdateUser();
  const [selectedFile, setSelectedFile] = useState<string>(userImage);
  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm<ProfileForm>({
    defaultValues: {
      username: user?.username,
    },
  });
  const userImageFile = watch("avatar");

  useEffect(() => {
    let objectUrl = "";
    if (userImageFile?.length) {
      objectUrl = URL.createObjectURL(userImageFile[0]);
      setSelectedFile(objectUrl);
    }
    return () => URL.revokeObjectURL("" || objectUrl);
  }, [userImageFile]);

  const onSubmit = async (data: ProfileForm) => {
    console.log(data);
    await updateUser({
      ...data,
      username: data.username?.trim(),
      userId: user!.id,
    });
  };

  return (
    <ProfileLayout component="form" onSubmit={handleSubmit(onSubmit)}>
      <input
        id="avatar-button-file"
        type="file"
        {...register("avatar", { required: false })}
        style={{ position: "absolute", opacity: 0, zIndex: -999 }}
      />
      <Box
        component="label"
        mb={4}
        htmlFor="avatar-button-file"
        sx={{ cursor: "pointer" }}
      >
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={<EditIcon sx={{ width: "54px", height: "54px" }} />}
        >
          <Avatar
            alt="User avatar"
            src={selectedFile}
            sx={{ width: 252, height: 252 }}
          />
        </StyledBadge>
      </Box>
      <TextField
        label="User Name"
        variant="outlined"
        {...register("username", { required: true })}
      />
      <Button variant="contained" type="submit" disabled={!isValid}>
        Save
      </Button>
    </ProfileLayout>
  );
};
