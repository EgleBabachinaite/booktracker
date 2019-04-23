import {createClient} from "amazon-product-api";

export class Amazon {

    static AutClient() {
        // returning amazon client
        return createClient({
            // Amazon autentification keys
            awsId: "AKIAI43ZL7KTJDNCCIWA",
            awsSecret: "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",
            awsTag: "intjvision-20"
        });
    }
}
