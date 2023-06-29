import { Message } from "kafka-node";
// import { signupService } from "../../../services/signup.service";
import { Listener } from "./main.listener";

export class NewCompanyListener extends Listener {
    async onMessage(message: Message) {
        console.log(`new message for new company data ${message.value}`);
        const { user } = JSON.parse(<string>message.value);
        signupService.signup(user);
    }
}
