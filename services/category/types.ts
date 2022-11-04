export interface IAddCategoryApi {
  categoryName: string
}

export interface IReturnGetCategories {
  categoryId: string
  name: string
}


export interface IUpdateCategory{
  categoryId: string
  name: string
}
