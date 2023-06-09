/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import API from '@/src/apis';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { type UserList } from '@/src/shared/utils';

const useShowUserList = (): any => {
  const router = useRouter();
  const params = router.query;
  const [listOfUser, setListOfUser] = useState<UserList[]>([]);
  const [numberOfUsers, setNumberOfUsers] = useState(1000);
  const [limiter, setLimiter] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [startingIndex, setStartingIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState(true);

  const handleChangePageEvent = (page: number): void => {
    void router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        page: page
      }
    });
    setCurrentPage(page);
    setStartingIndex(limiter * page - limiter + 1);
    setLastIndex(limiter * page);
  };

  const handleShowPerPage = (e: any): void => {
    const thisLimiter = e.target.value;
    setLimiter(thisLimiter);
    void router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        page_size: thisLimiter
      }
    });
  };
  const searchHandler = (searchTerm: string): void => {
    setSearchTerm(searchTerm);

    void router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        search: searchTerm
      }
    });
  };

  const handleSortBy = (attribute: string): void => {
    const newSortOrder = sortBy === attribute ? !sortOrder : true;
    setSortBy(attribute);
    setSortOrder(newSortOrder);

    void router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        sort_by: attribute,
        sort_order: newSortOrder ? 'asc' : 'desc'
      }
    });
  };

  useEffect(() => {
    const queryParams: any = {};

    if (sortBy !== 'id') {
      queryParams.sort_by = sortBy;
      queryParams.sort_order = sortOrder ? 'asc' : 'desc';
    }

    if (limiter !== 0) {
      queryParams.page_size = limiter;
    }

    if (currentPage !== 0) {
      queryParams.page = currentPage;
    }

    if (searchTerm !== '') {
      queryParams.search = searchTerm;
    }

    setListOfUser([]);

    const fetchdata = async (): Promise<void> => {
      try {
        const response = await API.get(`user/${params.company_id}`, {
          params: queryParams
        });
        setNumberOfUsers(response.data.pagination.count);
        setListOfUser(response.data.user);
      } catch (error) {
        console.error(error);
      }
    };
    void fetchdata();
  }, [params, sortBy, sortOrder, limiter, currentPage, searchTerm]);

  const showPerPageOption = [
    { id: 10, text: '10' },
    { id: 25, text: '25' },
    { id: 50, text: '50' },
    { id: numberOfUsers, text: `all (${numberOfUsers})` }
  ];

  const tableHeader = [
    { text: 'First Name', onClick: () => handleSortBy('first_name') },
    { text: 'Last Name', onClick: () => handleSortBy('last_name') },
    { text: 'User Name' },
    { text: 'Email', onClick: () => handleSortBy('email') },
    { text: 'Role' },
    { text: 'Action' }
  ];

  return {
    listOfUser,
    showPerPageOption,
    handleChangePageEvent,
    handleShowPerPage,
    currentPage,
    lastIndex,
    startingIndex,
    numberOfUsers,
    limiter,
    searchHandler,
    tableHeader
  };
};
export default useShowUserList;
