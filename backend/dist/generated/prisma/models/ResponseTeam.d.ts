import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model ResponseTeam
 *
 */
export type ResponseTeamModel = runtime.Types.Result.DefaultSelection<Prisma.$ResponseTeamPayload>;
export type AggregateResponseTeam = {
    _count: ResponseTeamCountAggregateOutputType | null;
    _min: ResponseTeamMinAggregateOutputType | null;
    _max: ResponseTeamMaxAggregateOutputType | null;
};
export type ResponseTeamMinAggregateOutputType = {
    team_id: string | null;
    team_name: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ResponseTeamMaxAggregateOutputType = {
    team_id: string | null;
    team_name: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ResponseTeamCountAggregateOutputType = {
    team_id: number;
    team_name: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ResponseTeamMinAggregateInputType = {
    team_id?: true;
    team_name?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ResponseTeamMaxAggregateInputType = {
    team_id?: true;
    team_name?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ResponseTeamCountAggregateInputType = {
    team_id?: true;
    team_name?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ResponseTeamAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ResponseTeam to aggregate.
     */
    where?: Prisma.ResponseTeamWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ResponseTeams to fetch.
     */
    orderBy?: Prisma.ResponseTeamOrderByWithRelationInput | Prisma.ResponseTeamOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.ResponseTeamWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ResponseTeams from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ResponseTeams.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned ResponseTeams
    **/
    _count?: true | ResponseTeamCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: ResponseTeamMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: ResponseTeamMaxAggregateInputType;
};
export type GetResponseTeamAggregateType<T extends ResponseTeamAggregateArgs> = {
    [P in keyof T & keyof AggregateResponseTeam]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateResponseTeam[P]> : Prisma.GetScalarType<T[P], AggregateResponseTeam[P]>;
};
export type ResponseTeamGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ResponseTeamWhereInput;
    orderBy?: Prisma.ResponseTeamOrderByWithAggregationInput | Prisma.ResponseTeamOrderByWithAggregationInput[];
    by: Prisma.ResponseTeamScalarFieldEnum[] | Prisma.ResponseTeamScalarFieldEnum;
    having?: Prisma.ResponseTeamScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ResponseTeamCountAggregateInputType | true;
    _min?: ResponseTeamMinAggregateInputType;
    _max?: ResponseTeamMaxAggregateInputType;
};
export type ResponseTeamGroupByOutputType = {
    team_id: string;
    team_name: string;
    createdAt: Date;
    updatedAt: Date;
    _count: ResponseTeamCountAggregateOutputType | null;
    _min: ResponseTeamMinAggregateOutputType | null;
    _max: ResponseTeamMaxAggregateOutputType | null;
};
export type GetResponseTeamGroupByPayload<T extends ResponseTeamGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ResponseTeamGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ResponseTeamGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ResponseTeamGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ResponseTeamGroupByOutputType[P]>;
}>>;
export type ResponseTeamWhereInput = {
    AND?: Prisma.ResponseTeamWhereInput | Prisma.ResponseTeamWhereInput[];
    OR?: Prisma.ResponseTeamWhereInput[];
    NOT?: Prisma.ResponseTeamWhereInput | Prisma.ResponseTeamWhereInput[];
    team_id?: Prisma.StringFilter<"ResponseTeam"> | string;
    team_name?: Prisma.StringFilter<"ResponseTeam"> | string;
    createdAt?: Prisma.DateTimeFilter<"ResponseTeam"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ResponseTeam"> | Date | string;
    operations?: Prisma.OperationLogListRelationFilter;
};
export type ResponseTeamOrderByWithRelationInput = {
    team_id?: Prisma.SortOrder;
    team_name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    operations?: Prisma.OperationLogOrderByRelationAggregateInput;
};
export type ResponseTeamWhereUniqueInput = Prisma.AtLeast<{
    team_id?: string;
    AND?: Prisma.ResponseTeamWhereInput | Prisma.ResponseTeamWhereInput[];
    OR?: Prisma.ResponseTeamWhereInput[];
    NOT?: Prisma.ResponseTeamWhereInput | Prisma.ResponseTeamWhereInput[];
    team_name?: Prisma.StringFilter<"ResponseTeam"> | string;
    createdAt?: Prisma.DateTimeFilter<"ResponseTeam"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ResponseTeam"> | Date | string;
    operations?: Prisma.OperationLogListRelationFilter;
}, "team_id">;
export type ResponseTeamOrderByWithAggregationInput = {
    team_id?: Prisma.SortOrder;
    team_name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ResponseTeamCountOrderByAggregateInput;
    _max?: Prisma.ResponseTeamMaxOrderByAggregateInput;
    _min?: Prisma.ResponseTeamMinOrderByAggregateInput;
};
export type ResponseTeamScalarWhereWithAggregatesInput = {
    AND?: Prisma.ResponseTeamScalarWhereWithAggregatesInput | Prisma.ResponseTeamScalarWhereWithAggregatesInput[];
    OR?: Prisma.ResponseTeamScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ResponseTeamScalarWhereWithAggregatesInput | Prisma.ResponseTeamScalarWhereWithAggregatesInput[];
    team_id?: Prisma.StringWithAggregatesFilter<"ResponseTeam"> | string;
    team_name?: Prisma.StringWithAggregatesFilter<"ResponseTeam"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ResponseTeam"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"ResponseTeam"> | Date | string;
};
export type ResponseTeamCreateInput = {
    team_id?: string;
    team_name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    operations?: Prisma.OperationLogCreateNestedManyWithoutTeamInput;
};
export type ResponseTeamUncheckedCreateInput = {
    team_id?: string;
    team_name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    operations?: Prisma.OperationLogUncheckedCreateNestedManyWithoutTeamInput;
};
export type ResponseTeamUpdateInput = {
    team_id?: Prisma.StringFieldUpdateOperationsInput | string;
    team_name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    operations?: Prisma.OperationLogUpdateManyWithoutTeamNestedInput;
};
export type ResponseTeamUncheckedUpdateInput = {
    team_id?: Prisma.StringFieldUpdateOperationsInput | string;
    team_name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    operations?: Prisma.OperationLogUncheckedUpdateManyWithoutTeamNestedInput;
};
export type ResponseTeamCreateManyInput = {
    team_id?: string;
    team_name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ResponseTeamUpdateManyMutationInput = {
    team_id?: Prisma.StringFieldUpdateOperationsInput | string;
    team_name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ResponseTeamUncheckedUpdateManyInput = {
    team_id?: Prisma.StringFieldUpdateOperationsInput | string;
    team_name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ResponseTeamCountOrderByAggregateInput = {
    team_id?: Prisma.SortOrder;
    team_name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ResponseTeamMaxOrderByAggregateInput = {
    team_id?: Prisma.SortOrder;
    team_name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ResponseTeamMinOrderByAggregateInput = {
    team_id?: Prisma.SortOrder;
    team_name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ResponseTeamScalarRelationFilter = {
    is?: Prisma.ResponseTeamWhereInput;
    isNot?: Prisma.ResponseTeamWhereInput;
};
export type ResponseTeamCreateNestedOneWithoutOperationsInput = {
    create?: Prisma.XOR<Prisma.ResponseTeamCreateWithoutOperationsInput, Prisma.ResponseTeamUncheckedCreateWithoutOperationsInput>;
    connectOrCreate?: Prisma.ResponseTeamCreateOrConnectWithoutOperationsInput;
    connect?: Prisma.ResponseTeamWhereUniqueInput;
};
export type ResponseTeamUpdateOneRequiredWithoutOperationsNestedInput = {
    create?: Prisma.XOR<Prisma.ResponseTeamCreateWithoutOperationsInput, Prisma.ResponseTeamUncheckedCreateWithoutOperationsInput>;
    connectOrCreate?: Prisma.ResponseTeamCreateOrConnectWithoutOperationsInput;
    upsert?: Prisma.ResponseTeamUpsertWithoutOperationsInput;
    connect?: Prisma.ResponseTeamWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ResponseTeamUpdateToOneWithWhereWithoutOperationsInput, Prisma.ResponseTeamUpdateWithoutOperationsInput>, Prisma.ResponseTeamUncheckedUpdateWithoutOperationsInput>;
};
export type ResponseTeamCreateWithoutOperationsInput = {
    team_id?: string;
    team_name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ResponseTeamUncheckedCreateWithoutOperationsInput = {
    team_id?: string;
    team_name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ResponseTeamCreateOrConnectWithoutOperationsInput = {
    where: Prisma.ResponseTeamWhereUniqueInput;
    create: Prisma.XOR<Prisma.ResponseTeamCreateWithoutOperationsInput, Prisma.ResponseTeamUncheckedCreateWithoutOperationsInput>;
};
export type ResponseTeamUpsertWithoutOperationsInput = {
    update: Prisma.XOR<Prisma.ResponseTeamUpdateWithoutOperationsInput, Prisma.ResponseTeamUncheckedUpdateWithoutOperationsInput>;
    create: Prisma.XOR<Prisma.ResponseTeamCreateWithoutOperationsInput, Prisma.ResponseTeamUncheckedCreateWithoutOperationsInput>;
    where?: Prisma.ResponseTeamWhereInput;
};
export type ResponseTeamUpdateToOneWithWhereWithoutOperationsInput = {
    where?: Prisma.ResponseTeamWhereInput;
    data: Prisma.XOR<Prisma.ResponseTeamUpdateWithoutOperationsInput, Prisma.ResponseTeamUncheckedUpdateWithoutOperationsInput>;
};
export type ResponseTeamUpdateWithoutOperationsInput = {
    team_id?: Prisma.StringFieldUpdateOperationsInput | string;
    team_name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ResponseTeamUncheckedUpdateWithoutOperationsInput = {
    team_id?: Prisma.StringFieldUpdateOperationsInput | string;
    team_name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type ResponseTeamCountOutputType
 */
export type ResponseTeamCountOutputType = {
    operations: number;
};
export type ResponseTeamCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    operations?: boolean | ResponseTeamCountOutputTypeCountOperationsArgs;
};
/**
 * ResponseTeamCountOutputType without action
 */
export type ResponseTeamCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResponseTeamCountOutputType
     */
    select?: Prisma.ResponseTeamCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * ResponseTeamCountOutputType without action
 */
export type ResponseTeamCountOutputTypeCountOperationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OperationLogWhereInput;
};
export type ResponseTeamSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    team_id?: boolean;
    team_name?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    operations?: boolean | Prisma.ResponseTeam$operationsArgs<ExtArgs>;
    _count?: boolean | Prisma.ResponseTeamCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["responseTeam"]>;
export type ResponseTeamSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    team_id?: boolean;
    team_name?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["responseTeam"]>;
export type ResponseTeamSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    team_id?: boolean;
    team_name?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["responseTeam"]>;
export type ResponseTeamSelectScalar = {
    team_id?: boolean;
    team_name?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ResponseTeamOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"team_id" | "team_name" | "createdAt" | "updatedAt", ExtArgs["result"]["responseTeam"]>;
export type ResponseTeamInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    operations?: boolean | Prisma.ResponseTeam$operationsArgs<ExtArgs>;
    _count?: boolean | Prisma.ResponseTeamCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ResponseTeamIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type ResponseTeamIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $ResponseTeamPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ResponseTeam";
    objects: {
        operations: Prisma.$OperationLogPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        team_id: string;
        team_name: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["responseTeam"]>;
    composites: {};
};
export type ResponseTeamGetPayload<S extends boolean | null | undefined | ResponseTeamDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ResponseTeamPayload, S>;
export type ResponseTeamCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ResponseTeamFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ResponseTeamCountAggregateInputType | true;
};
export interface ResponseTeamDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ResponseTeam'];
        meta: {
            name: 'ResponseTeam';
        };
    };
    /**
     * Find zero or one ResponseTeam that matches the filter.
     * @param {ResponseTeamFindUniqueArgs} args - Arguments to find a ResponseTeam
     * @example
     * // Get one ResponseTeam
     * const responseTeam = await prisma.responseTeam.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResponseTeamFindUniqueArgs>(args: Prisma.SelectSubset<T, ResponseTeamFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ResponseTeamClient<runtime.Types.Result.GetResult<Prisma.$ResponseTeamPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one ResponseTeam that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ResponseTeamFindUniqueOrThrowArgs} args - Arguments to find a ResponseTeam
     * @example
     * // Get one ResponseTeam
     * const responseTeam = await prisma.responseTeam.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResponseTeamFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ResponseTeamFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ResponseTeamClient<runtime.Types.Result.GetResult<Prisma.$ResponseTeamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ResponseTeam that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponseTeamFindFirstArgs} args - Arguments to find a ResponseTeam
     * @example
     * // Get one ResponseTeam
     * const responseTeam = await prisma.responseTeam.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResponseTeamFindFirstArgs>(args?: Prisma.SelectSubset<T, ResponseTeamFindFirstArgs<ExtArgs>>): Prisma.Prisma__ResponseTeamClient<runtime.Types.Result.GetResult<Prisma.$ResponseTeamPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ResponseTeam that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponseTeamFindFirstOrThrowArgs} args - Arguments to find a ResponseTeam
     * @example
     * // Get one ResponseTeam
     * const responseTeam = await prisma.responseTeam.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResponseTeamFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ResponseTeamFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ResponseTeamClient<runtime.Types.Result.GetResult<Prisma.$ResponseTeamPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more ResponseTeams that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponseTeamFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ResponseTeams
     * const responseTeams = await prisma.responseTeam.findMany()
     *
     * // Get first 10 ResponseTeams
     * const responseTeams = await prisma.responseTeam.findMany({ take: 10 })
     *
     * // Only select the `team_id`
     * const responseTeamWithTeam_idOnly = await prisma.responseTeam.findMany({ select: { team_id: true } })
     *
     */
    findMany<T extends ResponseTeamFindManyArgs>(args?: Prisma.SelectSubset<T, ResponseTeamFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ResponseTeamPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a ResponseTeam.
     * @param {ResponseTeamCreateArgs} args - Arguments to create a ResponseTeam.
     * @example
     * // Create one ResponseTeam
     * const ResponseTeam = await prisma.responseTeam.create({
     *   data: {
     *     // ... data to create a ResponseTeam
     *   }
     * })
     *
     */
    create<T extends ResponseTeamCreateArgs>(args: Prisma.SelectSubset<T, ResponseTeamCreateArgs<ExtArgs>>): Prisma.Prisma__ResponseTeamClient<runtime.Types.Result.GetResult<Prisma.$ResponseTeamPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many ResponseTeams.
     * @param {ResponseTeamCreateManyArgs} args - Arguments to create many ResponseTeams.
     * @example
     * // Create many ResponseTeams
     * const responseTeam = await prisma.responseTeam.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ResponseTeamCreateManyArgs>(args?: Prisma.SelectSubset<T, ResponseTeamCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many ResponseTeams and returns the data saved in the database.
     * @param {ResponseTeamCreateManyAndReturnArgs} args - Arguments to create many ResponseTeams.
     * @example
     * // Create many ResponseTeams
     * const responseTeam = await prisma.responseTeam.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many ResponseTeams and only return the `team_id`
     * const responseTeamWithTeam_idOnly = await prisma.responseTeam.createManyAndReturn({
     *   select: { team_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ResponseTeamCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ResponseTeamCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ResponseTeamPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a ResponseTeam.
     * @param {ResponseTeamDeleteArgs} args - Arguments to delete one ResponseTeam.
     * @example
     * // Delete one ResponseTeam
     * const ResponseTeam = await prisma.responseTeam.delete({
     *   where: {
     *     // ... filter to delete one ResponseTeam
     *   }
     * })
     *
     */
    delete<T extends ResponseTeamDeleteArgs>(args: Prisma.SelectSubset<T, ResponseTeamDeleteArgs<ExtArgs>>): Prisma.Prisma__ResponseTeamClient<runtime.Types.Result.GetResult<Prisma.$ResponseTeamPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one ResponseTeam.
     * @param {ResponseTeamUpdateArgs} args - Arguments to update one ResponseTeam.
     * @example
     * // Update one ResponseTeam
     * const responseTeam = await prisma.responseTeam.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ResponseTeamUpdateArgs>(args: Prisma.SelectSubset<T, ResponseTeamUpdateArgs<ExtArgs>>): Prisma.Prisma__ResponseTeamClient<runtime.Types.Result.GetResult<Prisma.$ResponseTeamPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more ResponseTeams.
     * @param {ResponseTeamDeleteManyArgs} args - Arguments to filter ResponseTeams to delete.
     * @example
     * // Delete a few ResponseTeams
     * const { count } = await prisma.responseTeam.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ResponseTeamDeleteManyArgs>(args?: Prisma.SelectSubset<T, ResponseTeamDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ResponseTeams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponseTeamUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ResponseTeams
     * const responseTeam = await prisma.responseTeam.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ResponseTeamUpdateManyArgs>(args: Prisma.SelectSubset<T, ResponseTeamUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ResponseTeams and returns the data updated in the database.
     * @param {ResponseTeamUpdateManyAndReturnArgs} args - Arguments to update many ResponseTeams.
     * @example
     * // Update many ResponseTeams
     * const responseTeam = await prisma.responseTeam.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more ResponseTeams and only return the `team_id`
     * const responseTeamWithTeam_idOnly = await prisma.responseTeam.updateManyAndReturn({
     *   select: { team_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends ResponseTeamUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ResponseTeamUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ResponseTeamPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one ResponseTeam.
     * @param {ResponseTeamUpsertArgs} args - Arguments to update or create a ResponseTeam.
     * @example
     * // Update or create a ResponseTeam
     * const responseTeam = await prisma.responseTeam.upsert({
     *   create: {
     *     // ... data to create a ResponseTeam
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ResponseTeam we want to update
     *   }
     * })
     */
    upsert<T extends ResponseTeamUpsertArgs>(args: Prisma.SelectSubset<T, ResponseTeamUpsertArgs<ExtArgs>>): Prisma.Prisma__ResponseTeamClient<runtime.Types.Result.GetResult<Prisma.$ResponseTeamPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of ResponseTeams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponseTeamCountArgs} args - Arguments to filter ResponseTeams to count.
     * @example
     * // Count the number of ResponseTeams
     * const count = await prisma.responseTeam.count({
     *   where: {
     *     // ... the filter for the ResponseTeams we want to count
     *   }
     * })
    **/
    count<T extends ResponseTeamCountArgs>(args?: Prisma.Subset<T, ResponseTeamCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ResponseTeamCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a ResponseTeam.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponseTeamAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ResponseTeamAggregateArgs>(args: Prisma.Subset<T, ResponseTeamAggregateArgs>): Prisma.PrismaPromise<GetResponseTeamAggregateType<T>>;
    /**
     * Group by ResponseTeam.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponseTeamGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends ResponseTeamGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ResponseTeamGroupByArgs['orderBy'];
    } : {
        orderBy?: ResponseTeamGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ResponseTeamGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResponseTeamGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the ResponseTeam model
     */
    readonly fields: ResponseTeamFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for ResponseTeam.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__ResponseTeamClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    operations<T extends Prisma.ResponseTeam$operationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ResponseTeam$operationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OperationLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the ResponseTeam model
 */
export interface ResponseTeamFieldRefs {
    readonly team_id: Prisma.FieldRef<"ResponseTeam", 'String'>;
    readonly team_name: Prisma.FieldRef<"ResponseTeam", 'String'>;
    readonly createdAt: Prisma.FieldRef<"ResponseTeam", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"ResponseTeam", 'DateTime'>;
}
/**
 * ResponseTeam findUnique
 */
export type ResponseTeamFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResponseTeam
     */
    select?: Prisma.ResponseTeamSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResponseTeam
     */
    omit?: Prisma.ResponseTeamOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ResponseTeamInclude<ExtArgs> | null;
    /**
     * Filter, which ResponseTeam to fetch.
     */
    where: Prisma.ResponseTeamWhereUniqueInput;
};
/**
 * ResponseTeam findUniqueOrThrow
 */
export type ResponseTeamFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResponseTeam
     */
    select?: Prisma.ResponseTeamSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResponseTeam
     */
    omit?: Prisma.ResponseTeamOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ResponseTeamInclude<ExtArgs> | null;
    /**
     * Filter, which ResponseTeam to fetch.
     */
    where: Prisma.ResponseTeamWhereUniqueInput;
};
/**
 * ResponseTeam findFirst
 */
export type ResponseTeamFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResponseTeam
     */
    select?: Prisma.ResponseTeamSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResponseTeam
     */
    omit?: Prisma.ResponseTeamOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ResponseTeamInclude<ExtArgs> | null;
    /**
     * Filter, which ResponseTeam to fetch.
     */
    where?: Prisma.ResponseTeamWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ResponseTeams to fetch.
     */
    orderBy?: Prisma.ResponseTeamOrderByWithRelationInput | Prisma.ResponseTeamOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ResponseTeams.
     */
    cursor?: Prisma.ResponseTeamWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ResponseTeams from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ResponseTeams.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ResponseTeams.
     */
    distinct?: Prisma.ResponseTeamScalarFieldEnum | Prisma.ResponseTeamScalarFieldEnum[];
};
/**
 * ResponseTeam findFirstOrThrow
 */
export type ResponseTeamFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResponseTeam
     */
    select?: Prisma.ResponseTeamSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResponseTeam
     */
    omit?: Prisma.ResponseTeamOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ResponseTeamInclude<ExtArgs> | null;
    /**
     * Filter, which ResponseTeam to fetch.
     */
    where?: Prisma.ResponseTeamWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ResponseTeams to fetch.
     */
    orderBy?: Prisma.ResponseTeamOrderByWithRelationInput | Prisma.ResponseTeamOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ResponseTeams.
     */
    cursor?: Prisma.ResponseTeamWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ResponseTeams from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ResponseTeams.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ResponseTeams.
     */
    distinct?: Prisma.ResponseTeamScalarFieldEnum | Prisma.ResponseTeamScalarFieldEnum[];
};
/**
 * ResponseTeam findMany
 */
export type ResponseTeamFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResponseTeam
     */
    select?: Prisma.ResponseTeamSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResponseTeam
     */
    omit?: Prisma.ResponseTeamOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ResponseTeamInclude<ExtArgs> | null;
    /**
     * Filter, which ResponseTeams to fetch.
     */
    where?: Prisma.ResponseTeamWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ResponseTeams to fetch.
     */
    orderBy?: Prisma.ResponseTeamOrderByWithRelationInput | Prisma.ResponseTeamOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing ResponseTeams.
     */
    cursor?: Prisma.ResponseTeamWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ResponseTeams from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ResponseTeams.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ResponseTeams.
     */
    distinct?: Prisma.ResponseTeamScalarFieldEnum | Prisma.ResponseTeamScalarFieldEnum[];
};
/**
 * ResponseTeam create
 */
export type ResponseTeamCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResponseTeam
     */
    select?: Prisma.ResponseTeamSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResponseTeam
     */
    omit?: Prisma.ResponseTeamOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ResponseTeamInclude<ExtArgs> | null;
    /**
     * The data needed to create a ResponseTeam.
     */
    data: Prisma.XOR<Prisma.ResponseTeamCreateInput, Prisma.ResponseTeamUncheckedCreateInput>;
};
/**
 * ResponseTeam createMany
 */
export type ResponseTeamCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many ResponseTeams.
     */
    data: Prisma.ResponseTeamCreateManyInput | Prisma.ResponseTeamCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * ResponseTeam createManyAndReturn
 */
export type ResponseTeamCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResponseTeam
     */
    select?: Prisma.ResponseTeamSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ResponseTeam
     */
    omit?: Prisma.ResponseTeamOmit<ExtArgs> | null;
    /**
     * The data used to create many ResponseTeams.
     */
    data: Prisma.ResponseTeamCreateManyInput | Prisma.ResponseTeamCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * ResponseTeam update
 */
export type ResponseTeamUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResponseTeam
     */
    select?: Prisma.ResponseTeamSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResponseTeam
     */
    omit?: Prisma.ResponseTeamOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ResponseTeamInclude<ExtArgs> | null;
    /**
     * The data needed to update a ResponseTeam.
     */
    data: Prisma.XOR<Prisma.ResponseTeamUpdateInput, Prisma.ResponseTeamUncheckedUpdateInput>;
    /**
     * Choose, which ResponseTeam to update.
     */
    where: Prisma.ResponseTeamWhereUniqueInput;
};
/**
 * ResponseTeam updateMany
 */
export type ResponseTeamUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update ResponseTeams.
     */
    data: Prisma.XOR<Prisma.ResponseTeamUpdateManyMutationInput, Prisma.ResponseTeamUncheckedUpdateManyInput>;
    /**
     * Filter which ResponseTeams to update
     */
    where?: Prisma.ResponseTeamWhereInput;
    /**
     * Limit how many ResponseTeams to update.
     */
    limit?: number;
};
/**
 * ResponseTeam updateManyAndReturn
 */
export type ResponseTeamUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResponseTeam
     */
    select?: Prisma.ResponseTeamSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ResponseTeam
     */
    omit?: Prisma.ResponseTeamOmit<ExtArgs> | null;
    /**
     * The data used to update ResponseTeams.
     */
    data: Prisma.XOR<Prisma.ResponseTeamUpdateManyMutationInput, Prisma.ResponseTeamUncheckedUpdateManyInput>;
    /**
     * Filter which ResponseTeams to update
     */
    where?: Prisma.ResponseTeamWhereInput;
    /**
     * Limit how many ResponseTeams to update.
     */
    limit?: number;
};
/**
 * ResponseTeam upsert
 */
export type ResponseTeamUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResponseTeam
     */
    select?: Prisma.ResponseTeamSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResponseTeam
     */
    omit?: Prisma.ResponseTeamOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ResponseTeamInclude<ExtArgs> | null;
    /**
     * The filter to search for the ResponseTeam to update in case it exists.
     */
    where: Prisma.ResponseTeamWhereUniqueInput;
    /**
     * In case the ResponseTeam found by the `where` argument doesn't exist, create a new ResponseTeam with this data.
     */
    create: Prisma.XOR<Prisma.ResponseTeamCreateInput, Prisma.ResponseTeamUncheckedCreateInput>;
    /**
     * In case the ResponseTeam was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.ResponseTeamUpdateInput, Prisma.ResponseTeamUncheckedUpdateInput>;
};
/**
 * ResponseTeam delete
 */
export type ResponseTeamDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResponseTeam
     */
    select?: Prisma.ResponseTeamSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResponseTeam
     */
    omit?: Prisma.ResponseTeamOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ResponseTeamInclude<ExtArgs> | null;
    /**
     * Filter which ResponseTeam to delete.
     */
    where: Prisma.ResponseTeamWhereUniqueInput;
};
/**
 * ResponseTeam deleteMany
 */
export type ResponseTeamDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ResponseTeams to delete
     */
    where?: Prisma.ResponseTeamWhereInput;
    /**
     * Limit how many ResponseTeams to delete.
     */
    limit?: number;
};
/**
 * ResponseTeam.operations
 */
export type ResponseTeam$operationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationLog
     */
    select?: Prisma.OperationLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OperationLog
     */
    omit?: Prisma.OperationLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OperationLogInclude<ExtArgs> | null;
    where?: Prisma.OperationLogWhereInput;
    orderBy?: Prisma.OperationLogOrderByWithRelationInput | Prisma.OperationLogOrderByWithRelationInput[];
    cursor?: Prisma.OperationLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OperationLogScalarFieldEnum | Prisma.OperationLogScalarFieldEnum[];
};
/**
 * ResponseTeam without action
 */
export type ResponseTeamDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResponseTeam
     */
    select?: Prisma.ResponseTeamSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResponseTeam
     */
    omit?: Prisma.ResponseTeamOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ResponseTeamInclude<ExtArgs> | null;
};
//# sourceMappingURL=ResponseTeam.d.ts.map