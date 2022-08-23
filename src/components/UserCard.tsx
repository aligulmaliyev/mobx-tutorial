import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Badge, Box, ButtonGroup, IconButton, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { IUser } from "../models/User";
import { useStore } from "../store";

interface IUserCard {
  user: IUser;
  filters: any;
}

const UserCard = ({ user, filters }: IUserCard) => {
  const navigate = useNavigate();
  const { userStore } = useStore();
  const handleDelete = (id: number) => {
    userStore.deleteUserAsync(id).then(() => userStore.getUsersAsync(filters));
  };
  const profilePicture =
    user.gender == "Male"
      ? "https://www.transparentpng.com/thumb/happy-person/ow7OmE-happy-person-cut-out-pic.png"
      : "https://www.pngall.com/wp-content/uploads/8/Woman-PNG-High-Quality-Image.png";
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={profilePicture} h={150} w="100%" objectFit="contain" />
      <Box p="6" display="flex" flexDirection="column">
        <Box display="flex" gap={2}>
          <Box
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            noOfLines={1}
            color="gray.600"
            fontSize="sm"
          >
            Full Name:
          </Box>
          {user.first_name + " " + user.last_name}
        </Box>
        <Box display="flex" gap={2} mt={2}>
          <Box
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            noOfLines={1}
            color="gray.600"
            fontSize="sm"
          >
            Gender:
          </Box>
          <Badge
            borderRadius="full"
            px="2"
            colorScheme={user.gender === "Male" ? "teal" : "red"}
          >
            {user.gender}
          </Badge>
        </Box>
        <Box display="flex" gap={2} mt={2}>
          <Box
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            noOfLines={1}
            color="gray.600"
            fontSize="sm"
          >
            Email:
          </Box>
          <Box noOfLines={1}>{user.email}</Box>
        </Box>
        <Box display="flex" gap={2} mt={2}>
          <Box
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            noOfLines={1}
            color="gray.600"
            fontSize="sm"
          >
            Ip Address:
          </Box>
          {user.ip_address}
        </Box>
        <Box alignSelf="center" gap={2} mt={4}>
          <ButtonGroup size="sm" variant="outline">
            <IconButton
              onClick={() => navigate("/users/" + user.id)}
              aria-label="Add to friends"
              icon={<EditIcon />}
            />
            <IconButton
              onClick={() => handleDelete(user.id)}
              aria-label="Add to friends"
              icon={<DeleteIcon />}
            />
          </ButtonGroup>
        </Box>
      </Box>
    </Box>
  );
};

export default UserCard;
