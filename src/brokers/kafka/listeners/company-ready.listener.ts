import { Message } from "kafka-node";
// import { companyService } from "../../../services/company.service";
import { Listener } from "./main.listener";

export class CompanyReadyListener extends Listener {
    async onMessage(message: Message) {
        console.log(`new message for company ready data ${message.value}`);
        const { company } = JSON.parse(<string>message.value);
        companyService.updateReady(company);
    }
}
