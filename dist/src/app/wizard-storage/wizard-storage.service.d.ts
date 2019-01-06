export declare class WizardStorageService {
    local: any;
    session: any;
    cookies: any;
    private subjects;
    private isSupported(storage);
    private getItem(store, key, version?);
    private setItem(store, key, value, version?, expires?);
    private getAllKeys(storage);
    private onChange(key, storage);
    constructor();
    toJson(value: any): any;
}
