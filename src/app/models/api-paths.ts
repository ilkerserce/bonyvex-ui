export enum ApiPaths {
  //Login
  Login = "users/login",

  //Foods
  GetFoods = "foods/getFoods",
  AddFood = 'foods/addFood',
  GetFoodForm = 'foods/getFoodForm',
  EditFood = "foods/editFood",
  DeleteFood = "foods/deleteFood",

  //Categories
  GetCategories = 'categories/getCategories',
  GetPrimaryCategories = 'categories/getPrimaryCategories',
  GetSubCategoryForm = 'categories/getSubCategoryForm',

  AddPrimaryCategory = 'categories/addPrimaryCategory',
  EditPrimaryCategory = 'categories/editSubCategory',
  DeletePrimaryCategory = 'categories/deletePrimaryCategory',

  AddSubCategory = 'categories/addSubCategory',
  EditSubCategory = 'categories/editSubCategory',
  DeleteSubCategory = 'categories/deleteSubCategory',

  //FAQ
  GetFAQs = "faqs/getFaqs",
  GetFAQForm = "faqs/getFaqForm",
  AddFAQ = "faqs/add",
  EditFAQ = "faqs/edit",
  DeleteFAQ = "faqs/deleteFaq",
}