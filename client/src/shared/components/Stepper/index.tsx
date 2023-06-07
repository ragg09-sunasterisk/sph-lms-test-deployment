import { type ReactElement, type FC, useState, useEffect, Children } from 'react';
import type { StepProps } from './Step';
import type { ChildElementObject } from '../../utils';
import Button from '../Button';
import ProgressBar from '../ProgressBar';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { reset, setActiveStep } from '@/src/features/stepper/stepperSlice';

interface StepperProps {
  title: string;
  contentClass?: string;
  onNext?: ((index: number) => boolean) | ((index: number) => Promise<boolean>);
  children: ReactElement<StepProps> | Array<ReactElement<StepProps>>;
}

const Stepper: FC<StepperProps> = ({ title, contentClass = '', onNext, children }) => {
  const { activeStep, isStepValid } = useAppSelector((state) => state.stepper);
  const dispatch = useAppDispatch();
  const [childrenList, setChildrenList] = useState<ChildElementObject>({});
  const childListLength = Object.keys(childrenList).length;

  const handleNext = async (): Promise<void> => {
    let validated = true;
    if (onNext) {
      validated = await onNext(activeStep);
    }
    if (activeStep + 1 < childListLength && validated) {
      dispatch(setActiveStep(activeStep + 1));
    }
    if (activeStep + 1 === childListLength) {
      dispatch(reset());
    }
  };

  const handlePrev = (): void => {
    if (activeStep > 0) {
      dispatch(setActiveStep(activeStep - 1));
    }
  };

  useEffect(() => {
    let step = 0;
    const childrenListObj: ChildElementObject = {};
    Children.map(children, (child) => {
      childrenListObj[step] = {
        id: step,
        childContent: child,
        ...child.props,
      };
      step++;
    });

    setChildrenList(childrenListObj);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, activeStep]);

  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-[20px]">{title}</h2>
      <div className="space-y-1 font-normal">
        <p>
          Step <span className="text-red">{childrenList[activeStep] ? activeStep + 1 : 0}</span> of{' '}
          {childListLength}
        </p>
        <label htmlFor="progress" className="font-medium text-[14px]">
          {childrenList[activeStep]?.childContent.props.title ?? ''}
        </label>
        <ProgressBar
          className="h-[14px]"
          value={((activeStep + 1) / childListLength) * 100}
          id="progress"
        />
      </div>
      <div className={`rounded-md border p-[16px] ${contentClass}`}>
        {childrenList[activeStep]?.childContent}
      </div>

      <div className="flex space-x-4 text-[14px]">
        <Button
          onClick={handlePrev}
          text={activeStep ? childrenList[activeStep]?.childContent.props.backTitle : 'Back'}
          buttonClass={`border border-textGray py-[6px] !px-4 !font-medium ${
            activeStep === 0 && 'opacity-50 cursor-not-allowed'
          }`}
        />
        <Button
          onClick={handleNext}
          text={activeStep ? childrenList[activeStep]?.childContent.props.nextTitle : 'Next'}
          buttonClass={`border py-[6px] border-red !text-red !w-32 !font-medium ${
            !isStepValid && 'opacity-50 cursor-not-allowed'
          }`}
        />
      </div>
    </div>
  );
};

export default Stepper;
