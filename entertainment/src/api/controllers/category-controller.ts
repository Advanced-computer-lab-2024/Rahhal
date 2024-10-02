import { Request, Response } from "express";
import * as categorySerivce from "../../services/category-service";
import { STATUS_CODES } from "../../utils/constants";


export async function updateCategory(req: Request, res: Response){

    try{
        const id  = req.params.id;
        const newCategory = req.body.name;
        const result = await categorySerivce.updateCategory(id, newCategory);
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

export async function deleteCategory(req:Request, res:Response){
    try{
        const id = req.params.id;
        const result = await categorySerivce.deleteCategory(id)
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

export async function createCategory(req:Request, res:Response){
    try{
        const category = req.body;
        const result = await categorySerivce.createCategory(category);
        res.status(STATUS_CODES.CREATED).json(result);
    }
    catch(error){
        const message = (error as Error).message;
        res.status(STATUS_CODES.SERVER_ERROR).json({error : message})
    }
}

export async function getCategories(req:Request, res:Response){
    try{
        const result = await categorySerivce.getCategories();
        res.status(STATUS_CODES.STATUS_OK).json(result);
    }
    catch(error){
        const message = (error as Error).message;
        res.status(STATUS_CODES.SERVER_ERROR).json({error : message})
    }
}