import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Heading, Stack } from "@chakra-ui/react";
import { useFormik } from "formik";
import Form from "../../components/Form";
import { useStore } from "../../store";
import { IUser } from "../../models/User";

const AddOrUpdate = () => {
  const { userStore } = useStore();
  const navigate = useNavigate();
  const params = useParams();
  const id = Number(params.id);
  const [user, setUser] = useState<IUser>({
    id: -1,
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    ip_address: "",
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: user,
    onSubmit: (user) => {
      if (id !== -1) {
        userStore.updateUserAsync(user).then(() => userStore.getUsersAsync());
        navigate("/users");
      } else {
        user.id = Math.ceil(Math.random() * 2000);
        userStore.createUserAsync(user).then(() => userStore.getUsersAsync());
        navigate("/users");
      }
    },
  });

  useEffect(() => {
    if (id !== -1) {
      userStore.getUserAsync(id).then(() => {
        setUser(userStore.user);
      });
    }
  }, [id]);

  let title = id === -1 ? "Create" : "Update";

  return (
    <Container h={"100vh"} display={"flex"} alignItems={"center"}>
      <Stack spacing={10} w={"100%"}>
        <Heading as="h2" size="lg">
          {title}
        </Heading>
        <Form formik={formik} buttonText={title} />
      </Stack>
    </Container>
  );
};

export default AddOrUpdate;
