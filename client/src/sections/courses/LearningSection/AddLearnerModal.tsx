/* eslint-disable multiline-ternary */
import React, { useState } from 'react';
import Button from '@/src/shared/components/Button';
import Modal from '@/src/shared/components/Modal/Modal';
import Pagination from '@/src/shared/components/Pagination';
import SearchBar from '@/src/shared/components/SearchBar/SearchBar';
import CloseIcon from '@/src/shared/icons/CloseIcon';
import { useRouter } from 'next/router';
import { useEnrollLearnerMutation, useGetLearnerQuery } from '@/src/services/traineeAPI';
import { alertError, alertSuccess } from '@/src/shared/utils';

interface AddLearnerModalProps {
  closeModal: () => void;
}

const AddLearnerModal: React.FC<AddLearnerModalProps> = ({ closeModal }): JSX.Element => {
  const router = useRouter();
  const params = router.query;
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const courseID = params.id;
  const [enrollTrainees] = useEnrollLearnerMutation();
  const { data: trainee } = useGetLearnerQuery({
    courseId: courseID,
    isEnrolled: false,
    pageNumber: page,
    searchQuery: search,
  });
  const enrollees = trainee?.learners.data;

  const handleAddMaterialModal = (): void => {
    closeModal();
  };

  const handleSearch = (search: string): void => {
    setSearch(search);
    setPage(1);
  };

  const handleChangePageEvent = (page: number): void => {
    setPage(page);
  };

  const handleCheckboxChange = (id: number): void => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleAddLearners = async (): Promise<void> => {
    const postData = {
      trainee: selectedIds.join(','),
    };

    try {
      const res = await enrollTrainees({
        courseId: courseID,
        postData,
      });

      if ('data' in res) {
        alertSuccess(res.data.message);
      } else {
        throw new Error('Something went wrong');
      }
      handleAddMaterialModal();
    } catch (error: any) {
      alertError(error.message);
    }
  };

  return (
    <div>
      <Modal isOpen={true} className="w-[521px]">
        <div className="p-4">
          <div className="flex justify-between mb-6">
            <span className="text-gray-600 font-bold">Add Learner</span>
            <div onClick={handleAddMaterialModal}>
              <CloseIcon className="cursor-pointer w-[30px] h-[30px]" />
            </div>
          </div>
          <div className="my-4">
            <SearchBar
              placeholder="Search"
              onSearchEvent={handleSearch}
              className="w-3/4 text-[14px] text-lightGray3"
            />
            <div className="grid">
              <table className="mt-4">
                <thead>
                  <tr className="">
                    <th className="bg-lightGray2 rounded-tl-md"></th>
                    <th className="bg-lightGray2 py-[13px] text-[15px] font-semibold">
                      First Name
                    </th>
                    <th className="bg-lightGray2 py-[13px] text-[15px] font-semibold rounded-tr-md">
                      Last Name
                    </th>
                  </tr>
                </thead>
                {enrollees?.length > 0 ? (
                  <tbody>
                    {enrollees.map((col: any, index: number) => (
                      <tr
                        className={` ${index % 2 === 0 ? '' : 'bg-gray-100'} align-middle `}
                        key={index}
                      >
                        <td className="grid place-items-center py-3">
                          <input
                            type="checkbox"
                            className="w-[15px] h-[15px] accent-black"
                            checked={selectedIds.includes(col.trainee_id)}
                            onChange={() => {
                              handleCheckboxChange(col.trainee_id);
                            }}
                          />
                        </td>
                        <td className="text-[13px] py-2">{col.firstname}</td>
                        <td className="text-[13px] py-2">{col.lastname}</td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tbody>
                    <tr>
                      <td colSpan={3} className="text-center py-4">
                        <p className="text-center font-semibold text-xl">No enrollees found.</p>
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
            <div className="flex justify-center my-5">
              <Pagination
                maxPages={5}
                totalPages={trainee?.learners.total_pages}
                currentPage={page}
                onChangePage={handleChangePageEvent}
              />
            </div>
          </div>
          <div className="flex mb-5">
            <Button
              text="Cancel"
              buttonClass="bg-white px-[14px] py-[5px] border-2 border-gray-500 rounded-md mr-2"
              textColor="text-gray-600"
              onClick={handleAddMaterialModal}
            />
            <Button
              text="Add Learners"
              buttonClass="bg-white px-6 border-2 border-red rounded-md "
              textColor="text-red"
              disabled={!(selectedIds.length > 0)}
              onClick={handleAddLearners}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddLearnerModal;
