import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const rpcError = exception.getError();

        // Caso 1: El error es un objeto con 'status' y 'message'
        if (typeof rpcError === 'object' && 'status' in rpcError && 'message' in rpcError) {
            const status = rpcError.status;
            return response.status(status).json(rpcError);
        }

        // Caso 2: El error es un string 
        response.status(HttpStatus.BAD_REQUEST).json({
            status: HttpStatus.BAD_REQUEST,
            message: rpcError,
        });
    }
}