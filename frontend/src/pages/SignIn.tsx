import { useNavigate, Link } from "react-router-dom";

import { usePocket } from "../contexts/PocketContext";
import { useForm } from "react-hook-form";

interface LoginForm {
  email: string;
  password: string;
}

export const SignIn = () => {
  const { login } = usePocket();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<LoginForm>();

  const onSubmit = (data: LoginForm) => {
    if (data) {
      login(data.email, data.password).then(() => {
        navigate("/live-match");
      });
    }
  };

  return (
    <section>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Email" type="email" {...register("email")} />
        <input
          placeholder="Password"
          type="password"
          {...register("password")}
        />
        <button type="submit">Login</button>
        <Link to="/">Go to Sign Up</Link>
      </form>
    </section>
  );
};
