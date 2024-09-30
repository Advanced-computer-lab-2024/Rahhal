import express from 'express';
import * as preferenceTagsService from '../services/preference-tags-service';
import STATUS_CODES from '../utils/constants';

const getPreferenceTags = async (req: express.Request, res: express.Response) => {
    try {
        const preferenceTags = await preferenceTagsService.getPreferenceTags();
        res.status(STATUS_CODES.STATUS_OK).json(preferenceTags);
    }
    catch (error: any) {
        res.status(STATUS_CODES.SERVER_ERROR).json({ error: error.message });
    }
}

const getPreferenceTag = async (req: express.Request, res: express.Response) => {
    try {
        const id = req.params.id;
        const preferenceTag = await preferenceTagsService.getPreferenceTag(id);
        if(!preferenceTag) {
            res.status(STATUS_CODES.NOT_FOUND).json({ error: 'Preference Tag not found' });
        }
        res.status(STATUS_CODES.STATUS_OK).json(preferenceTag);
    }
    catch (error: any) {
        res.status(STATUS_CODES.NOT_FOUND).json({ error: error.message });
    }
}

const createPreferenceTag = async (req: express.Request, res: express.Response) => {
    try {
        const name = req.body.name;
        const preferenceTag = await preferenceTagsService.createPreferenceTag(name);
        res.status(STATUS_CODES.CREATED).json(preferenceTag);
    }
    catch (error: any) {
        res.status(STATUS_CODES.SERVER_ERROR).json({ error: error.message });
    }
}

export default {
    getPreferenceTags,
    getPreferenceTag,
    createPreferenceTag
};

export const updatePreferenceTag = async (req: Request, res: Response) => {
    try{
        const id=req.params.id;
        const newName=req.body.name;
        const result = await preferenceTagService.updatePreferenceTag(id,newName);
        if (result)
            res.status(status_codes.STATUS_OK).json(result);
        else 
            res.status(status_codes.NOT_FOUND).json({message : "Preference Tag not found"});
        }catch(error)
        {  
            const message = (error as Error).message;
            res.status(status_codes.SERVER_ERROR).json({error : message}) 
        }
}          

export const deletePreferenceTag = async (req: Request, res: Response) => {
    try{
        const id=req.params.id;
        const result = await preferenceTagService.deletePreferenceTag(id);
        if (result)
            res.status(status_codes.STATUS_OK).json(result);
        else 
            res.status(status_codes.NOT_FOUND).json({message : "Preference Tag not found"});
    }catch(error)
    {
        const message = (error as Error).message;
        res.status(status_codes.SERVER_ERROR).json({error : message}) 
    }
}