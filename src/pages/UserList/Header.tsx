import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate("/users/" + -1)} colorScheme="twitter">
      Add
    </Button>
  );
};

export default Header;
