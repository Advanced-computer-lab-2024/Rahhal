import { Request, Response } from "express";
import * as Category from "../services/category-service";
import { STATUS_CODES } from "../utils/constants";


export const updateCategory = async (req: Request, res: Response) => {

    try{
        const id  = req.params.id;
        const newCategory = req.body;
        const result = await Category.updatePreferenceTag(id, newCategory);
        if(result){
            res.status(STATUS_CODES.STATUS_OK).json(result);
        }
        else{
            res.status(STATUS_CODES.NOT_FOUND).json({message: "Category not found"});
        }

    }catch(error){
        const message = (error as Error).message;
        res.status(STATUS_CODES.SERVER_ERROR).json({error : message}) 
    }
}

export const deleteCategory = async(req:Request, res:Response)=>{
    try{
        const id = req.params.id;
        const result = await Category.deleteCategory(id)
        if(result){
            res.status(STATUS_CODES.STATUS_OK).json(result);

        }else{
            res.status(STATUS_CODES.NOT_FOUND).json({message: "Category not found"});
        }
    }catch(error){
        const message = (error as Error).message;
        res.status(STATUS_CODES.SERVER_ERROR).json({error : message})
    }
}