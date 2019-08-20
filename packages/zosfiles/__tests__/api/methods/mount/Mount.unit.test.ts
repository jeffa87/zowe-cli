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

import { ImperativeError, TextUtils } from "@zowe/imperative";
import { Mount, IMountFsOptions } from "../../../..";
import { ZosmfRestClient } from "../../../../../rest";
import { ZosFilesMessages } from "../../../../src/api/constants/ZosFiles.messages";


describe("Mount FS", () => {
    const dummySession: any = {};
    const fileSystemName = "TEST.ZFS";
    const mountPoint="/u/ibmuser/mount";

    it("should succeed with correct parameters", async () => {
        (ZosmfRestClient as any).putExpectString = jest.fn(() => {
            // Do nothing
        });
        const options: IMountFsOptions = {
            "fs-type":"ZFS",
            "mode":"rdonly"
        };
        await Mount.fs(dummySession, fileSystemName, mountPoint, options);
    });

    it("should fail with a bad mode", async () => {
        let caughtError;
        (ZosmfRestClient as any).putExpectString = jest.fn(() => {
            // Do nothing
        });
        const options = {
            "fs-type":"ZFS",
            "mode":"rw"
        };
        try {
            await Mount.fs(dummySession, fileSystemName, mountPoint, options);
        } catch (e) {
            caughtError = e;
        }
        expect(caughtError).toBeDefined();
        expect(caughtError.message).toContain(ZosFilesMessages.invalidMountModeOption.message);
    });

    it("should fail with a bad option", async () => {
        let caughtError;
        (ZosmfRestClient as any).putExpectString = jest.fn(() => {
            // Do nothing
        });
        const options = {
            "fs-type":"ZFS",
            "mode":"rdonly",
            "moed":"rw"
        };
        try {
            await Mount.fs(dummySession, fileSystemName, mountPoint, options);
        } catch (e) {
            caughtError = e;
        }
        expect(caughtError).toBeDefined();
        expect(caughtError.message).toContain(ZosFilesMessages.invalidFilesMountOption.message);
    });

    it("should fail if REST client throws error", async () => {
        const error = new Error("This is a test");

        let caughtError;
        (ZosmfRestClient as any).putExpectString = jest.fn(() => {
            throw error;
        });
        const options = {
            "fs-type":"ZFS",
            "mode":"rdonly"
        };

        try {
            await Mount.fs(dummySession, fileSystemName, mountPoint, options);
        } catch (e) {
            caughtError = e;
        }

        expect(caughtError).toBeDefined();
        expect(caughtError).toBe(error);
    });
});
