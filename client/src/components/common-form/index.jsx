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
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <FormControls
        formControls={formControls}
        formData={formData}
        setFormData={setFormData}
      />
      <Button type="submit" className={'mt-5 w-full'}>
        {buttonText}
      </Button>
    </form>
  );
};

// Export
export default CommonForm;
