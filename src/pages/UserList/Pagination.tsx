import {
  Pagination,
  PaginationContainer,
  PaginationNext,
  PaginationPage,
  PaginationPageGroup,
  PaginationPrevious,
  PaginationSeparator,
} from "@ajna/pagination";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const UserPagination = ({
  pagesCount,
  currentPage,
  handlePageChange,
}: any) => {
  return (
    <Pagination
      pagesCount={pagesCount}
      currentPage={currentPage}
      onPageChange={handlePageChange}
    >
      <PaginationContainer
        align="center"
        justify="space-between"
        gap={10}
        p={4}
      >
        <PaginationPrevious>
          <ChevronLeftIcon fontSize={25} />
        </PaginationPrevious>
        <PaginationPageGroup
          isInline
          align="center"
          gap={2}
          separator={<PaginationSeparator w={10} bg="gray.300" />}
        >
          {Array.from<number>(pagesCount).map((page: number) => (
            <PaginationPage
              w={10}
              key={`pagination_page_${page}`}
              page={page}
              _current={{
                bg: "blue.300",
                color: "white",
              }}
              _hover={{
                bg: "blue.300",
                color: "white",
              }}
            />
          ))}
        </PaginationPageGroup>
        <PaginationNext>
          <ChevronRightIcon fontSize={25} />
        </PaginationNext>
      </PaginationContainer>
    </Pagination>
  );
};

export default UserPagination;
