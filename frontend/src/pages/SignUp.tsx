import { useNavigate, Link } from "react-router-dom";

import { usePocket } from "../contexts/PocketContext";
import { useForm } from "react-hook-form";

interface LoginForm {
    email: string;
    password: string;
}

export const SignUp = () => {
  const { register: pocketRegister } = usePocket();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
  } = useForm<LoginForm>();

  const onSubmit = (data: LoginForm) => {
    if (data) {
        pocketRegister(data.email, data.password).then(() => {
            navigate("/sign-in");
        });
    }
  };

  return (
    <section>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Email" type="email" {...register("email")} />
        <input placeholder="Password" type="password" {...register("password")} />
        <button type="submit">Create</button>
        <Link to="/sign-in">Go to Sign In</Link>
      </form>
    </section>
  );
};
