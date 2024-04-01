import { toast } from 'react-toastify';

export const showSuccessToastMessage = (successText) => {
  toast.success(successText);
};

export const showErrorToastMessage = (errorText) => {
  toast.error(errorText);
}