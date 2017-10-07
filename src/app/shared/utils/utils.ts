import * as nodeUtils from "util";

class LocalUtils {
    public jsonStringifySafe(value: any): string {
        let cache = [];
        let result = JSON.stringify(value, function(key, value) {
            if (typeof value === 'object' && value !== null) {
                if (cache.indexOf(value) !== -1) {
                    // Circular reference found, discard key
                    return;
                }
                // Store value in our collection
                cache.push(value);
            }
            return value;
        });
        cache = null; // Enable garbage collection    

        return result;
    }
}

export class Utils {
    static nodeUtils = nodeUtils;
    static local = new LocalUtils();
}

export default Utils;