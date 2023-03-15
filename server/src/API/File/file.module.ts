import { Module } from "@nestjs/common";
import { FileGateway } from "src/file/file.gateway";
// import { File, FileSchema } from "src/schema/file.schema";
import { FileController } from "./file.controller";
import { FileService } from "./file.service";

@Module({
    imports: [
        // MongooseModule.forFeature([{ name: File.name, schema: FileSchema }])
    ],
    controllers: [
        FileController
    ],
    providers: [
        FileGateway,FileService
    ],
})

export class FileModule { }