import {ApiProperty} from "@nestjs/swagger";
import {UserRole} from "../entities/userRole.enum";
import {User} from "../../users/models/users.model";

export class CreateRoleDto {
    readonly value: UserRole;
    readonly description: string;
}
