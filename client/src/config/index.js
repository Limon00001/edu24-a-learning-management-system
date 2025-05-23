/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 23 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// SignUp Form Controls
const signUpFormControls = [
  {
    name: 'username',
    label: 'User Name',
    placeholder: 'Enter your user name',
    type: 'text',
    componentType: 'input',
  },
  {
    name: 'email',
    label: 'User Email',
    placeholder: 'Enter your user email',
    type: 'email',
    componentType: 'input',
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    componentType: 'input',
  },
];

const signInFormControls = [
  {
    name: 'email',
    label: 'User Email',
    placeholder: 'Enter your user email',
    type: 'email',
    componentType: 'input',
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    componentType: 'input',
  },
];

// Export
export { signInFormControls, signUpFormControls };
