export interface IResponseBase<TModel> {
    statusCode: number;
    result: TModel;
    message?: string;
    responseDateTime: Date;
    totalCount?: number;
 }

 export interface IResponseModel<TModel> {
    data: IResponseBase<TModel>;
    error: any
 }