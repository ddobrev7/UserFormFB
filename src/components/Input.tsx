import React from 'react';
import '../styles/App.css';

interface InputCompProps {
  InputName: string;
  InputPlaceholder?: string;
  onChangeA?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  Id?: string;
  value?: string;
  InputType?: string;
  InputClassName: string;
  checked?: boolean;
  autoComplete?: string;
}

export const InputComp: React.FC<InputCompProps> = ({
  InputType = 'text',
  value,
  InputName,
  InputPlaceholder,
  onChangeA,
  InputClassName,
  checked,
  autoComplete,
  Id
}) => {
  return (
    <>
      <input
        className={InputClassName}
        id={Id}
        name={InputName}
        value={value}
        type={InputType}
        onChange={onChangeA}
        placeholder={InputPlaceholder}
        autoComplete={autoComplete}
        checked={checked}
      />
    </>
  );
};
