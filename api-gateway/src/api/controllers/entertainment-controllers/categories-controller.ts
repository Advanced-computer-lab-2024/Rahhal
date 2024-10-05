import type { Request, Response } from "express";
import * as categoriesService from "@/services/entertainment-services/categories-service";
import { STATUS_CODES } from "@/utils/constants";

// Categories controllers
export async function getAllCategories(req: Request, res: Response) {
  try {
    const categories = await categoriesService.getAllCategories();
    res.status(categories.status).json(categories.data);
  }
  catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function getCategoryById(req: Request, res: Response) {
  const categoryId = req.params.id;
  try {
    const category = await categoriesService.getCategoryById(categoryId);
    res.status(category.status).json(category.data);
  }
  catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function createCategory(req: Request, res: Response) {
  const categoryData = req.body;
  try {
    const category = await categoriesService.createCategory(categoryData);
    res.status(category.status).json(category.data);
  }
  catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function updateCategory(req: Request, res: Response) {
  const categoryId = req.params.id;
  const categoryData = req.body;
  try {
    const category = await categoriesService.updateCategory(categoryId, categoryData);
    res.status(category.status).json(category.data);
  }
  catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function deleteCategory(req: Request, res: Response) {
  const categoryId = req.params.id;
  try {
    const category = await categoriesService.deleteCategory(categoryId);
    res.status(category.status).json(category.data);
  }
  catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}
