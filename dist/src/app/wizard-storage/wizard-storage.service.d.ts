export declare class WizardStorageService {
    local: any;
    session: any;
    cookies: any;
    private subjects;
    private isSupported;
    private encode;
    private decode;
    private getStorageItem;
    private getItem;
    private setItem;
    private getAllKeys;
    private onChange;
    constructor();
    toJson(value: any): any;
}
