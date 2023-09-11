import {
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
  EventSubscriber,
  LoadEvent,
} from 'typeorm';
import { Users } from './user.entity';
import { aesDecrypt, aesEncrypt } from './encryption';
import { PIIDataConfig } from './piiDataConfig';

@EventSubscriber()
export class UserListener implements EntitySubscriberInterface {
  listenTo() {
    return Users;
  }

  beforeInsert(event: InsertEvent<any>) {
    console.log(event.entity);
    console.log(event.metadata.name);

    if (event.metadata.name in PIIDataConfig) {
      const piiFields = PIIDataConfig[event.metadata.name];
      for (const piiField of piiFields) {
        if (piiField in event.entity) {
          event.entity[piiField] = aesEncrypt(event.entity[piiField]);
        }
      }
    }
  }

  beforeUpdate(event: UpdateEvent<any>): void | Promise<any> {
    console.log(event.entity);
    console.log(event.metadata.name);

    if (event.metadata.name in PIIDataConfig) {
      const piiFields = PIIDataConfig[event.metadata.name];
      for (const piiField of piiFields) {
        if (piiField in event.entity) {
          event.entity[piiField] = aesEncrypt(event.entity[piiField]);
        }
      }
    }
  }

  afterLoad(entity: any, event?: LoadEvent<any>): void | Promise<any> {
    console.log(entity);
    console.log(event.metadata.name);

    if (event.metadata.name in PIIDataConfig) {
      const piiFields = PIIDataConfig[event.metadata.name];
      for (const piiField of piiFields) {
        if (piiField in entity) {
          entity[piiField] = aesDecrypt(entity[piiField]);
        }
      }
    }
  }
}
