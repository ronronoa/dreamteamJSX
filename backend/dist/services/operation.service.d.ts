import type { CreateOperationInput, CreateTeamInput, UpdateOperationInput, UpdateTeamInput } from "@/types/operation.types";
export declare const operationService: {
    findAllTeams(): Promise<{
        team_id: string;
        team_name: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findTeamById(teamId: string): Promise<void>;
    createTeam(data: CreateTeamInput): Promise<{
        team_id: string;
        team_name: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateTeam(teamId: string, data: UpdateTeamInput): Promise<{
        team_id: string;
        team_name: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteTeam(teamId: string): Promise<{
        success: boolean;
    }>;
    findAll(filters?: {
        status?: string;
        team_id?: string;
        from?: string;
        to?: string;
    }): Promise<({
        images: {
            attachment_id: string;
            operation_id: string;
            image_url: string;
            file_type: string | null;
            uploaded_by: string;
            uploadedAt: Date;
        }[];
        personsInvolved: {
            person_id: string;
            operation_id: string;
            full_name: string;
            age: number;
            sex: import("../generated/prisma/enums").Gender;
            contact_no: string | null;
            address: string | null;
        }[];
        responders: ({
            user: {
                name: string;
                user_id: string;
            };
        } & {
            operation_id: string;
            user_id: string;
        })[];
        submitter: {
            name: string;
            user_id: string;
            username: string;
        };
        team: {
            team_id: string;
            team_name: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        operation_id: string;
        team_id: string;
        operation_date: Date;
        name_of_caller: string;
        nature_of_operation: string;
        event_description: string;
        submitted_by: string;
        validated_by: string | null;
        status: import("../generated/prisma/enums").OperationStatus;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findById(operationId: string): Promise<{
        edits: ({
            admin: {
                name: string;
                user_id: string;
            };
        } & {
            edit_id: string;
            operation_id: string;
            admin_id: string;
            edit_notes: string | null;
            editedAt: Date;
        })[];
        images: {
            attachment_id: string;
            operation_id: string;
            image_url: string;
            file_type: string | null;
            uploaded_by: string;
            uploadedAt: Date;
        }[];
        personsInvolved: {
            person_id: string;
            operation_id: string;
            full_name: string;
            age: number;
            sex: import("../generated/prisma/enums").Gender;
            contact_no: string | null;
            address: string | null;
        }[];
        responders: ({
            user: {
                name: string;
                user_id: string;
            };
        } & {
            operation_id: string;
            user_id: string;
        })[];
        submitter: {
            name: string;
            user_id: string;
            username: string;
        };
        team: {
            team_id: string;
            team_name: string;
            createdAt: Date;
            updatedAt: Date;
        };
        validator: {
            name: string;
            user_id: string;
            username: string;
        } | null;
    } & {
        operation_id: string;
        team_id: string;
        operation_date: Date;
        name_of_caller: string;
        nature_of_operation: string;
        event_description: string;
        submitted_by: string;
        validated_by: string | null;
        status: import("../generated/prisma/enums").OperationStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
    create(submittedBy: string, data: CreateOperationInput): Promise<{
        responders: ({
            user: {
                name: string;
                user_id: string;
            };
        } & {
            operation_id: string;
            user_id: string;
        })[];
        team: {
            team_id: string;
            team_name: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        operation_id: string;
        team_id: string;
        operation_date: Date;
        name_of_caller: string;
        nature_of_operation: string;
        event_description: string;
        submitted_by: string;
        validated_by: string | null;
        status: import("../generated/prisma/enums").OperationStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(operationId: string, data: UpdateOperationInput): Promise<{
        operation_id: string;
        team_id: string;
        operation_date: Date;
        name_of_caller: string;
        nature_of_operation: string;
        event_description: string;
        submitted_by: string;
        validated_by: string | null;
        status: import("../generated/prisma/enums").OperationStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
    submit(operationId: string): Promise<{
        operation_id: string;
        team_id: string;
        operation_date: Date;
        name_of_caller: string;
        nature_of_operation: string;
        event_description: string;
        submitted_by: string;
        validated_by: string | null;
        status: import("../generated/prisma/enums").OperationStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
    setStatus(operationId: string, status: "VALIDATED" | "REJECTED", validatedBy: string): Promise<{
        operation_id: string;
        team_id: string;
        operation_date: Date;
        name_of_caller: string;
        nature_of_operation: string;
        event_description: string;
        submitted_by: string;
        validated_by: string | null;
        status: import("../generated/prisma/enums").OperationStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
};
//# sourceMappingURL=operation.service.d.ts.map