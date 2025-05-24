/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 23 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// Internal Imports
import { Button } from '../ui/button';
import FormControls from './form-controls';

// Common Form
const CommonForm = ({
  handleSubmit,
  buttonText = 'Submit',
  formControls = [],
  formData,
  setFormData,
  isButtonDisabled = false,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <FormControls
        formControls={formControls}
        formData={formData}
        setFormData={setFormData}
      />
      <Button
        type="submit"
        disabled={isButtonDisabled}
        className={`mt-5 w-full transition-all duration-300 ${
          isButtonDisabled
            ? 'opacity-50 cursor-not-allowed bg-black/90'
            : 'cursor-pointer transform hover:shadow-md active:scale-[0.98]'
        }`}
      >
        {buttonText}
      </Button>
    </form>
  );
};

// Export
export default CommonForm;
