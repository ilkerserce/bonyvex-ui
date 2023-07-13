export enum ApiPaths {
  //NODEJS
  //Login
  Login = "users/login.php",

  //Foods
  GetFoods = "foods/get-foods.php",
  AddFood = 'foods/add-food.php',
  GetFoodForm = 'foods/get-food-form.php',
  EditFood = "foods/edit-food.php",
  DeleteFood = "foods/delete-food.php",

  //Categories
  GetCategories = 'categories/get-categories.php',

  GetPrimaryCategories = 'primary-categories/get-primary-categories.php',
  AddPrimaryCategory = 'primary-categories/addPrimaryCategory.php',
  EditPrimaryCategory = 'primary-categories/edit-primary-category.php',
  DeletePrimaryCategory = 'primary-categories/deletePrimaryCategory.php',

  AddSubCategory = 'sub-categories/add-sub-category.php',
  DeleteSubCategory = 'sub-categories/delete-sub-category.php',
  EditSubCategory = 'sub-categories/edit-sub-category.php',
  GetSubCategoryForm = 'sub-categories/get-sub-category-form.php',
  GetAllSubCategories = 'sub-categories/get-sub-categories.php',
  GetSubCategories = 'sub-categories/get-sub-categories.php',


  //FAQ
  AddFAQ = "faqs/add-faq.php",
  DeleteFAQ = "faqs/delete-faq.php",
  EditFAQ = "faqs/edit-faq.php",
  GetFAQs = "faqs/get-faqs.php",
  GetFAQForm = "faqs/get-faq-form.php",

}