/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/indent */
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import {
  addCategory,
  changeEditMode,
  updateForm,
} from '@/src/features/learning-path/learningPathSlice';
import Dropdown from '@/src/shared/components/Dropdown';
import RFInputField from '@/src/shared/components/ReactForm/RFInputField';
import RFTextField from '@/src/shared/components/ReactForm/RFTextField';
import ChevronDown from '@/src/shared/icons/ChevronDownIcon';
import ExclamationPointIcon from '@/src/shared/icons/ExclamationPointIcon';
import type { MultiSelectOptionData } from '@/src/shared/utils';
import Image from 'next/image';
import { Fragment, useEffect } from 'react';
import {
  Controller,
  type FieldErrors,
  type FieldValues,
  type UseFormRegister,
} from 'react-hook-form';
import { MultiSelect } from 'react-multi-select-component';

interface InitialSectionProps {
  register?: UseFormRegister<any>;
  errors?: FieldErrors<FieldValues>;
  control?: any;
}

const InitialSection = ({ register, errors, control }: InitialSectionProps): JSX.Element => {
  const { values: learningPath, editMode } = useAppSelector((state) => state.learningPath);
  const dispatch = useAppDispatch();
  const categoriesOption: MultiSelectOptionData[] = categories.map(({ id, name }) => ({
    value: id,
    label: name,
  }));

  useEffect(() => {
    dispatch(changeEditMode(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <div className="space-y-1 mb-4">
        <div className="flex items-center space-x-1">
          <h3 className="font-medium text-sm">Preview Image</h3>
          <ExclamationPointIcon />
        </div>

        {learningPath.image ? (
          <Image
            height={200}
            width={300}
            className="w-[70%] h-[200px] object-cover"
            src={
              learningPath.image instanceof File
                ? URL.createObjectURL(learningPath.image)
                : learningPath.image
            }
            alt="preview image"
          />
        ) : (
          <p className="!my-6 text-[14px] italic">No image selected</p>
        )}
        {editMode && (
          <div>
            <div className="text-lightGray1">
              <p>Accepted file types: PNG, JPEG, JPG, WEBP</p>
              <p>Max file size: 3MB</p>
            </div>
            <RFInputField
              label="Upload image"
              labelClass="border px-4 py-[4px] border-textGray font-semibold text-[12px] rounded-md w-max cursor-pointer"
              id="upload"
              className="border-none hidden"
              type="file"
              register={
                register
                  ? register('image', {
                      onChange: (e: any) => dispatch(updateForm({ image: e.target.files[0] })),
                    })
                  : undefined
              }
              error={errors && (errors.image?.message as string)}
            />
          </div>
        )}
      </div>
      <RFInputField
        label="Learning Path Name"
        labelClass="!font-medium"
        className={`min-w-[70%] ${!editMode && 'border-transparent bg-transparent'}`}
        readOnly={!editMode}
        defaultValue={learningPath.name}
        register={
          register
            ? register('name', {
                onChange: (e: any) => {
                  dispatch(updateForm({ name: e.target.value }));
                },
              })
            : undefined
        }
        error={errors && (errors.name?.message as string)}
      />
      <RFTextField
        labelClass="!font-medium"
        label={`${editMode ? 'Description' : 'Description:'}`}
        className={`min-w-[70%] max-w-[100%] ${
          !editMode ? 'border-transparent bg-transparent resize-none h-max' : 'resize'
        }`}
        readOnly={!editMode}
        defaultValue={learningPath.description}
        register={
          register
            ? register('description', {
                onChange: (e: any) => {
                  dispatch(updateForm({ description: e.target.value }));
                },
              })
            : undefined
        }
        error={errors && (errors.description?.message as string)}
      />
      <div>
        <h3 className="text-gray-700 text-sm font-medium mb-2">Category</h3>
        {control && editMode ? (
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <MultiSelect
                options={categoriesOption}
                className={`w-[70%] accent-checkbox ${
                  errors?.category && 'border border-red rounded-md'
                }`}
                labelledBy="Select"
                value={field.value}
                onChange={(items: MultiSelectOptionData[]) => {
                  field.onChange(items);
                  dispatch(
                    addCategory(
                      items.map(({ label, value }) => ({
                        id: value,
                        name: label,
                      }))
                    )
                  );
                }}
              />
            )}
          />
        ) : (
          <div className="text-[14px] p-2 mb-2">
            {learningPath.category?.map((category) => category.name).join(', ')}
          </div>
        )}
        {errors?.category && (
          <div className="text-red rounded relative" role="alert">
            <span className="block sm:inline text-sm">{errors?.category?.message as string}</span>
          </div>
        )}
      </div>
      <div className="my-4">
        <h3 className="text-gray-700 text-sm font-medium mb-2">Status</h3>
        <div className="w-[111px]">
          <Dropdown
            disabled={!editMode}
            buttonText={learningPath.isActive ? 'Active' : 'Inactive'}
            buttonIcon={<ChevronDown height={16} width={16} color="#172826" />}
            options={[
              { label: 'Active', value: 'Active' },
              {
                label: 'Inactive',
                value: 'Inactive',
              },
            ]}
            onChange={(val) => {
              dispatch(updateForm({ isActive: val === 'Active' }));
            }}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default InitialSection;

// Please delete this during integration and fetch it from db
const categories = [
  {
    id: 1,
    name: 'category 1',
  },
  {
    id: 2,
    name: 'category 2',
  },
  {
    id: 3,
    name: 'category 3',
  },
  {
    id: 4,
    name: 'category 1',
  },
  {
    id: 5,
    name: 'category 2',
  },
  {
    id: 6,
    name: 'category 3',
  },
];
