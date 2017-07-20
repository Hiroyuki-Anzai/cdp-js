﻿import { Toast } from "cdp/ui";

/**
 * Porting が提供する機能
 */
class PortingFunction implements IPortingFunction {
    sayHello(): void {
        this.output("[iOS 'porting'] in use.");
        this.doSomething();
    }

    doSomething(): boolean {
        Toast.show("[iOS 'porting'] in use.");
        return true;
    }

    private output(msg: string): void {
        $("#porting-test-console").append(`<p>${msg}</p>`);
    }
}

export default new PortingFunction();
