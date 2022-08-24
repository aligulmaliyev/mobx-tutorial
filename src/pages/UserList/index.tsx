import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Center, Grid, GridItem, Stack, Text } from "@chakra-ui/react";
import { useStore } from "../../store";
import { useFilterHandle } from "../../hooks/useFilterHandle";
import Header from "./Header";
import Filters from "./Filters";
import UserCard from "../../components/UserCard";
import { useFormik } from "formik";
import { usePagination } from "@ajna/pagination";
import UserPagination from "./Pagination";
import { IUserFilter } from "../../models/User";

function UserList() {
  const { usersStore } = useStore();
  const [filters, onFilter] = useFilterHandle(
    {
      _page: 1,
      _limit: 10,
      first_name: undefined,
      last_name: undefined,
      email: undefined,
      gender: undefined,
      ip_address: undefined,
    },
    ({ filters }: any) => {
      usersStore.getUsersAsync(filters);
    }
  );
  const formik = useFormik<IUserFilter>({
    enableReinitialize: true,
    initialValues: filters,
    onSubmit: (filters: IUserFilter) => {
      usersStore.getUsersAsync(filters);
    },
  });

  const [usersTotal, setUsersTotal] = useState<number>(1);

  const { pagesCount, currentPage, setCurrentPage, pageSize } = usePagination({
    total: usersTotal,
    limits: {
      outer: 5,
      inner: 5,
    },
    initialState: {
      pageSize: usersTotal,
      currentPage: 1,
    },
  });

  useEffect(() => {
    setUsersTotal(usersStore.count / 10);
  }, [usersStore.count]);

  const handlePageChange = (nextPage: number): void => {
    onFilter("_page", nextPage);
    setCurrentPage(nextPage);
  };

  return (
    <Grid
      px={10}
      templateAreas={`"header header"
                      "nav    main"
                      "nav    footer"`}
      templateColumns=" 1fr 6fr"
      gap="10"
    >
      <GridItem area={"header"}>
        <Center>
          <Header />
        </Center>
      </GridItem>
      <GridItem area={"nav"}>
        <Filters formik={formik} />
      </GridItem>
      <GridItem area={"main"}>
        <Grid
          templateColumns="repeat(5, 1fr)"
          templateRows="repeat(2, 1fr)"
          gap={5}
        >
          {usersStore.users.map((user) => (
            <GridItem key={user.id}>
              <UserCard user={user} filters={filters} />
            </GridItem>
          ))}
        </Grid>
      </GridItem>
      <GridItem area={"footer"}>
        <Center>
          <Stack>
            <UserPagination
              pagesCount={pagesCount}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          </Stack>
        </Center>
      </GridItem>
    </Grid>
  );
}

export default observer(UserList);
