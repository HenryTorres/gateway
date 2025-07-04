import 'dotenv/config';
import * as joi from 'joi';

interface IEnvironmentsVar {
    HOST: string;
    PORT: number;
    PRODUCTS_MS_HOST: string;
    PRODUCTS_MS_PORT: number;
}

const envsSchema = joi.object<IEnvironmentsVar>({
    HOST: joi.string().required(),
    PORT: joi.number().required(),
    PRODUCTS_MS_HOST: joi.string().required(),
    PRODUCTS_MS_PORT: joi.number().required()
}).unknown(true)

const { error, value } = envsSchema.validate(process.env);

if (error)
    throw new Error(`Error de validación de variables de entorno: ${error}`)

const envVars: IEnvironmentsVar = value;

export const environmentVars = {
    HOST: envVars.HOST,
    PORT: envVars.PORT,
    PRODUCTS_MS_HOST: envVars.PRODUCTS_MS_HOST,
    PRODUCTS_MS_PORT: envVars.PRODUCTS_MS_PORT,
}