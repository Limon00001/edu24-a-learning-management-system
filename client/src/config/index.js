/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 23 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// SignUp Form Controls
const signUpFormControls = [
  {
    name: 'userName',
    label: 'User Name',
    placeholder: 'Enter your user name',
    type: 'text',
    componentType: 'input',
  },
  {
    name: 'userEmail',
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
    name: 'userEmail',
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

const initialSignUpFormData = [
  {
    userName: '',
    userEmail: '',
    password: '',
  },
];

const initialSignInFormData = [
  {
    userEmail: '',
    password: '',
  },
];

const languageOptions = [
  { id: 'english', label: 'English' },
  { id: 'spanish', label: 'Spanish' },
  { id: 'french', label: 'French' },
  { id: 'german', label: 'German' },
  { id: 'chinese', label: 'Chinese' },
  { id: 'japanese', label: 'Japanese' },
  { id: 'korean', label: 'Korean' },
  { id: 'portuguese', label: 'Portuguese' },
  { id: 'arabic', label: 'Arabic' },
  { id: 'russian', label: 'Russian' },
];

const courseLevelOptions = [
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' },
];

const courseCategories = [
  { id: 'web-development', label: 'Web Development' },
  { id: 'backend-development', label: 'Backend Development' },
  { id: 'data-science', label: 'Data Science' },
  { id: 'machine-learning', label: 'Machine Learning' },
  { id: 'artificial-intelligence', label: 'Artificial Intelligence' },
  { id: 'cloud-computing', label: 'Cloud Computing' },
  { id: 'cyber-security', label: 'Cyber Security' },
  { id: 'mobile-development', label: 'Mobile Development' },
  { id: 'game-development', label: 'Game Development' },
  { id: 'software-engineering', label: 'Software Engineering' },
];

const courseLandingPageFormControls = [
  {
    name: 'title',
    label: 'Title',
    componentType: 'input',
    type: 'text',
    placeholder: 'Enter course title',
  },
  {
    name: 'category',
    label: 'Category',
    componentType: 'select',
    type: 'text',
    placeholder: 'Select category',
    options: courseCategories,
  },
  {
    name: 'level',
    label: 'Level',
    componentType: 'select',
    type: 'text',
    placeholder: 'Select level',
    options: courseLevelOptions,
  },
  {
    name: 'primaryLanguage',
    label: 'Primary Language',
    componentType: 'select',
    type: 'text',
    placeholder: 'Select Language',
    options: languageOptions,
  },
  {
    name: 'subtitle',
    label: 'Subtitle',
    componentType: 'input',
    type: 'text',
    placeholder: 'Enter course subtitle',
  },
  {
    name: 'description',
    label: 'Description',
    componentType: 'textarea',
    type: 'text',
    placeholder: 'Enter course description',
  },
  {
    name: 'pricing',
    label: 'Pricing',
    componentType: 'input',
    type: 'number',
    placeholder: 'Enter course pricing',
  },
  {
    name: 'objectives',
    label: 'Objectives',
    componentType: 'textarea',
    type: 'text',
    placeholder: 'Enter course objectives',
  },
  {
    name: 'welcomeMessage',
    label: 'Welcome Message',
    componentType: 'textarea',
    placeholder: 'Welcome message for students',
  },
];

const courseLandingInitialFormData = {
  title: '',
  category: '',
  level: '',
  primaryLanguage: '',
  subtitle: '',
  description: '',
  pricing: '',
  objectives: '',
  welcomeMessage: '',
  image: '',
};

const courseCurriculumInitialFormData = [
  {
    title: '',
    videoUrl: '',
    freePreview: false,
    public_id: '',
  },
];

const sortOptions = [
  { id: 'price-lowtohigh', label: 'Price: Low to High' },
  { id: 'price-hightolow', label: 'Price: High to Low' },
  { id: 'title-atoz', label: 'Title: A to Z' },
  { id: 'title-ztoa', label: 'Title: Z to A' },
];

const filterOptions = {
  category: courseCategories,
  level: courseLevelOptions,
  primaryLanguage: languageOptions,
};

// Export
export {
  courseCategories,
  courseCurriculumInitialFormData,
  courseLandingInitialFormData,
  courseLandingPageFormControls,
  filterOptions,
  initialSignInFormData,
  initialSignUpFormData,
  signInFormControls,
  signUpFormControls,
  sortOptions,
};
