import { CheckIcon, SearchIcon } from "@chakra-ui/icons";
import { Button, Input, Select, Stack } from "@chakra-ui/react";

interface IForm {
  formik: any;
  buttonText: string;
}

const Form = ({ formik, buttonText }: IForm) => {
  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={5}>
        <Input
          placeholder="First name"
          id="first_name"
          name="first_name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.first_name}
        />
        <Input
          placeholder="Last Name"
          type="text"
          id="last_name"
          name="last_name"
          onChange={formik.handleChange}
          value={formik.values.last_name}
        />
        <Input
          placeholder="Email"
          type="email"
          id="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <Select
          title="gender"
          name="gender"
          id="gender"
          onChange={formik.handleChange}
          value={formik.values.gender}
        >
          <option value="">---</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </Select>
        <Input
          placeholder="Ip Address"
          type="text"
          name="ip_address"
          id="ip_address"
          onChange={formik.handleChange}
          value={formik.values.ip_address}
        />
        <Button
          rightIcon={buttonText == "Search" ? <SearchIcon /> : <CheckIcon />}
          colorScheme="teal"
          variant="outline"
          type="submit"
        >
          {buttonText}
        </Button>
      </Stack>
    </form>
  );
};

export default Form;
