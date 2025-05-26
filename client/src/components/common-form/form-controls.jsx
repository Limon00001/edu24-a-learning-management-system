/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 23 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// Internal Imports
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Textarea } from '../ui/textarea';

// FormControls
const FormControls = ({ formControls = [], formData, setFormData }) => {
  const renderComponentByType = (getControlItem) => {
    let element = null;
    const currentControlItemValue = formData[getControlItem.name] || '';

    switch (getControlItem.componentType) {
      case 'input':
        element = (
          <Input
            id={getControlItem.name}
            name={getControlItem.name}
            type={getControlItem.type}
            placeholder={getControlItem.placeholder}
            className="focus-visible:border-1 focus-visible:ring-0"
            value={currentControlItemValue}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
      case 'select':
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControlItem.name]: value,
              })
            }
            value={currentControlItemValue}
          >
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={getControlItem.placeholder}
                className="text-muted-foreground"
              />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((option) => (
                    <SelectItem
                      key={option.id}
                      value={option.id}
                      className="cursor-pointer hover:bg-accent"
                    >
                      {option.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      case 'textarea':
        element = (
          <Textarea
            id={getControlItem.name}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            value={currentControlItemValue}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
            className="focus-visible:border-1 focus-visible:ring-0"
          />
        );
        break;

      default:
        element = (
          <Input
            id={getControlItem.name}
            name={getControlItem.name}
            type={getControlItem.type}
            placeholder={getControlItem.placeholder}
            className="focus-visible:border-1 focus-visible:ring-0"
            value={currentControlItemValue}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
    }

    return element;
  };
  return (
    <div className="flex flex-col gap-3">
      {formControls.map((controlItem) => (
        <div key={controlItem.name}>
          <Label htmlFor={controlItem.name} className={'mb-1'}>
            {controlItem.label}
          </Label>
          {renderComponentByType(controlItem)}
        </div>
      ))}
    </div>
  );
};

// Export
export default FormControls;
