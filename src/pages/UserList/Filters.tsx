import { Heading, Stack } from "@chakra-ui/react";
import { useStore } from "../../store";
import Form from "../../components/Form";

const Filters = ({ formik }: any) => {
  return (
    <Stack spacing={5}>
      <Heading as="h2" size="lg">
        Filter User
      </Heading>
      <Form formik={formik} buttonText="Search" />
    </Stack>
  );
};

export default Filters;
