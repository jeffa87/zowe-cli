/*
* This program and the accompanying materials are made available under the terms of the
* Eclipse Public License v2.0 which accompanies this distribution, and is available at
* https://www.eclipse.org/legal/epl-v20.html
*
* SPDX-License-Identifier: EPL-2.0
*
* Copyright Contributors to the Zowe Project.
*
*/

import { ICommandDefinition } from "@zowe/imperative";

export const DataSetFileDefinition: ICommandDefinition = {
    name: "data-set",
    aliases: ["ds"],
    description: "View a z/OS Dataset",
    handler: __dirname + "/DataSet.handler",
    type: "command",
    positionals: [
        {
            name: "dataset",
            description: "Specify the dataset to view",
            type: "string",
            required: true
        }
    ],
    options: [],
    profile: {
        optional: ["ssh"]
    },
    examples: [
        {
            description: "View a dataset",
            options: '"MY.DATA.SET" '
        }
    ]
};
