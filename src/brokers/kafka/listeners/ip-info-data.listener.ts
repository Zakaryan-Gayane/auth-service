import { Message } from 'kafka-node';
// import { LogService } from '../../../services/log.service';
import { Listener } from './main.listener';
export class IpInfoDataListener extends Listener {
  async onMessage(message: Message) {
    console.log(`new message ipInfoData ${message.value}`);
    const { ipData, applicant, id } = JSON.parse(<string>message.value);
    if (ipData && ipData.length) LogService.updateIpData(ipData[0], id, applicant);
  }
}
